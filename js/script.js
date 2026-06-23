const maquinas = [
  { nome: "LP1HTLSL98929AG", ip: "192.168.0.10", status: "online" },
  { nome: "LP1HTLSL85150AG", ip: "192.168.0.11", status: "offline" },
  { nome: "LP1HTLSL98952AG", ip: "192.168.0.12", status: "online" },
  { nome: "LP1HTLSL98950AG", ip: "192.168.0.13", status: "offline" }
];

const tableBody = document.getElementById("tableBody");
const onlineCount = document.getElementById("onlineCount");
const offlineCount = document.getElementById("offlineCount");
const totalCount = document.getElementById("totalCount");
const search = document.getElementById("search");

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(m => {
    tableBody.innerHTML += `
      <tr>
        <td>${m.nome}</td>
        <td>${m.ip}</td>
        <td>${m.status}</td>
      </tr>
    `;
  });

  updateCounts(data);
}

function updateCounts(data) {
  const online = data.filter(m => m.status === "online").length;
  const offline = data.filter(m => m.status === "offline").length;

  onlineCount.textContent = online;
  offlineCount.textContent = offline;
  totalCount.textContent = data.length;
}

search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();

  const filtered = maquinas.filter(m =>
    m.nome.toLowerCase().includes(value)
  );

  renderTable(filtered);
});

renderTable(maquinas);
