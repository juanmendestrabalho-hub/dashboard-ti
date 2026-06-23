const maquinas = [
  { nome: "SCP98929CP", ip: "192.168.0.10", status: "online" },
  { nome: "SCP85150CP", ip: "192.168.0.11", status: "offline" },
  { nome: "SCP98952CP", ip: "192.168.0.12", status: "online" },
  { nome: "SCP98950CP", ip: "192.168.0.13", status: "offline" }
];

const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");

function render(data) {
  tableBody.innerHTML = "";

  data.forEach(m => {
    tableBody.innerHTML += `
      <tr>
        <td>${m.nome}</td>
        <td>${m.ip}</td>
        <td class="status-${m.status}">
          ${m.status.toUpperCase()}
        </td>
      </tr>
    `;
  });

  updateStats(data);
}

function updateStats(data) {
  const online = data.filter(m => m.status === "online").length;
  const offline = data.filter(m => m.status === "offline").length;

  document.getElementById("onlineCount").textContent = online;
  document.getElementById("offlineCount").textContent = offline;

  updateChart(online, offline);
}

search.addEventListener("keyup", () => {
  const value = search.value.toLowerCase();

  const filtered = maquinas.filter(m =>
    m.nome.toLowerCase().includes(value)
  );

  render(filtered);
});

function toggleTheme() {
  document.body.classList.toggle("light");
}

let chart;

function updateChart(online, offline) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Online", "Offline"],
      datasets: [{
        data: [online, offline],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    }
  });
}

// SIMULAÇÃO EM TEMPO REAL
setInterval(() => {
  maquinas.forEach(m => {
    m.status = Math.random() > 0.5 ? "online" : "offline";
  });

  render(maquinas);
}, 5000);

render(maquinas);
