// Valores iniciais padrão
const DEFAULT_INVENTORY = {
  moedas: 1000,
  diamantes: 800,
  vidas: 0,
  dicas: 0,
  distracoes: 0,
};

// Carregar o inventário do usuário
function loadInventory() {
  const savedInventory = localStorage.getItem("inventario");
  if (savedInventory) {
    return JSON.parse(savedInventory);
  }
  localStorage.setItem("inventario", JSON.stringify(DEFAULT_INVENTORY));
  return DEFAULT_INVENTORY;
}

// Atualizar elementos da UI
function updateUI(inventory) {
  // Atualizar a classe btn-status
  document.querySelector(".btn-status #btn-coin .contador").textContent = inventory.moedas;
  document.querySelector(".btn-status #btn-diamante .contador").textContent = inventory.diamantes;
  document.querySelector(".btn-status #btn-vida .contador").textContent = inventory.vidas;
  document.querySelector(".btn-status #btn-dica .contador").textContent = inventory.dicas;
  document.querySelector(".btn-status #btn-distacao .contador").textContent = inventory.distracoes;

  // Atualizar a classe user-items
  document.querySelector(".user-items #btn-coin").textContent = inventory.moedas;
  document.querySelector(".user-items #btn-diamante").textContent = inventory.diamantes;
  document.querySelector(".user-items #btn-vida").textContent = inventory.vidas;
  document.querySelector(".user-items #btn-dica").textContent = inventory.dicas;
  document.querySelector(".user-items #btn-distacao").textContent = inventory.distracoes;

  // Atualizar a classe btn-status-dialog (se necessário)
  document.querySelector(".btn-status-dialog #btn-coin-dialog .contador").textContent = inventory.moedas;
  document.querySelector(".btn-status-dialog #btn-diamante-dialog .contador").textContent = inventory.diamantes;
}

// Atualizar inventário
function updateInventory(item, quantity, cost = 0, currency = "moedas") {
  let inventory = loadInventory();

  // Verificar fundos
  if (currency === "moedas" && inventory.moedas < cost) {
    alert("Moedas insuficientes!");
    return;
  } else if (currency === "diamantes" && inventory.diamantes < cost) {
    alert("Diamantes insuficientes!");
    return;
  }

  // Atualizar valores
  if (cost > 0) {
    inventory[currency] -= cost;
  }
  inventory[item] += quantity;

  // Salvar no localStorage
  localStorage.setItem("inventario", JSON.stringify(inventory));

  // Atualizar UI
  updateUI(inventory);
}

// Função para comprar itens
function buyItem(item, cost, quantity, currency = "moedas") {
  switch (item) {
    case "diamante":
      updateInventory("diamantes", quantity, cost, currency); // Comprar diamantes
      break;
    case "moedas":
      updateInventory("moedas", quantity, cost, currency); // Comprar moedas
      break;
    case "dica":
      updateInventory("dicas", quantity, cost, currency); // Comprar dicas
      break;
    case "vida":
      updateInventory("vidas", quantity, cost, currency); // Comprar vidas
      break;
    case "distracao":
      updateInventory("distracoes", quantity, cost, currency); // Comprar distrações
      break;
    default:
      alert("Item inválido!");
      break;
  }
}

// Inicializar o inventário
document.addEventListener("DOMContentLoaded", () => {
  updateUI(loadInventory());
});
