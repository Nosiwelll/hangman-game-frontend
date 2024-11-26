document.addEventListener("DOMContentLoaded", function() {
  // Funções para abrir e fechar o modal
  window.openModal = function() {
    document.getElementById("instructionsModal").classList.remove("hidden");
  }

  window.closeModal = function() {
    document.getElementById("instructionsModal").classList.add("hidden");
  }

  // Adicionar event listeners
  document.querySelector(".btn-jogo").addEventListener("click", openModal);
  document.querySelector(".close").addEventListener("click", closeModal);

  const largeLogo = document.getElementById("imgLogoLarge");
  const content = document.querySelector(".content");
  const logoContainer = document.querySelector(".logo-container");

  // Oculta a logo grande com fade-out após 1.2 segundos
  setTimeout(() => {
    largeLogo.style.opacity = "0";
  }, 1200);

  // Remove a logo grande, mostra o conteúdo com fade-in e restaura o overflow do body após 3 segundos
  setTimeout(() => {
    logoContainer.style.display = "none";
    content.classList.remove("hidden");
    content.classList.add("fade-in");

    // Restaura o scroll na página principal
    document.body.style.overflow = "auto";
  }, 3000);
});
