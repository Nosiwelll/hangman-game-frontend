// Envolvendo todo o código dentro do DOMContentLoaded para garantir que o DOM esteja carregado
document.addEventListener("DOMContentLoaded", function () {
  // Definindo as músicas para cada tema
  const musicas = {
    "0": new Audio("../../audio/faroeste.mp3"),
    "1": new Audio("../../audio/natal.mp3"),
    "2": new Audio("../../audio/halloween.mp3"),
    "3": new Audio("../../audio/mar.mp3")
  };

  let musicaAtual = musicas["0"]; // Música padrão
  musicaAtual.pause(); // Pausa no início
  let isPlaying = false;

  const soundToggle = document.getElementById("sound-toggle");
  const soundIcon = document.getElementById("sound-icon");

  soundToggle.addEventListener("click", () => {
    if (isPlaying) {
      musicaAtual.pause();
      soundIcon.classList.remove("fa-volume-up");
      soundIcon.classList.add("fa-volume-mute");
      isPlaying = false;
    } else {
      musicaAtual.play().then(() => {
        soundIcon.classList.remove("fa-volume-mute");
        soundIcon.classList.add("fa-volume-up");
        isPlaying = true;
      }).catch(error => {
        console.error("Erro ao tocar o áudio:", error);
        alert("Não foi possível ativar o som. Tente novamente.");
      });
    }
  });

  function changeTheme(theme) {
    const body = document.body;
    body.classList.remove('lobby-default', 'lobby-tema1', 'lobby-tema2', 'lobby-tema3');
    const themeClass = theme === '0' ? 'lobby-default' : `lobby-tema${theme}`;
    body.classList.add(themeClass);

    // Troca a música
    if (musicaAtual) {
      musicaAtual.pause();
      musicaAtual.currentTime = 0;
    }
    musicaAtual = musicas[theme] || musicas["0"];

    if (isPlaying) {
      musicaAtual.play().catch(error => {
        console.error("Erro ao tocar o áudio:", error);
      });
    }
  }

  // Função para alterar o fundo da tela de vitória ou derrota com base no tema
  function alterarFundoModal(tema) {
    const modalVitoriaDerrota = document.querySelectorAll(".modal-content");
    let imagemFundoModal;

    switch (tema) {
      case "0":
        imagemFundoModal = "url('../../img/fundo_faroesteGame.png')";
        break;
      case "1":
        imagemFundoModal = "url('../../img/fundo_vitoria_natal.jpg')";
        break;
      case "2":
        imagemFundoModal = "url('../../img/fundo_vitoria_halloween.jpg')";
        break;
      case "3":
        imagemFundoModal = "url('../../img/fundo_vitoria_mar.jpg')";
        break;
      default:
        imagemFundoModal = "url('../../img/fundo_vitoria_padrao.jpg')";
        break;
    }

    // Aplica o estilo de fundo para todas as telas de vitória/derrota
    modalVitoriaDerrota.forEach((modal) => {
      modal.style.backgroundImage = imagemFundoModal;
      modal.style.backgroundSize = "cover";
      modal.style.backgroundRepeat = "no-repeat";
      modal.style.backgroundPosition = "center";
    });
  }

  // Função para alterar o fundo com base no tema
  function alterarFundo(tema) {
    const body = document.body;
    let imagemFundo;

    switch (tema) {
      case "0":
        imagemFundo = "url('../../img/fundo_faroesteGame.png')";
        break;
      case "1":
        imagemFundo = "url('../../img/fundo_natalGame.png')";
        break;
      case "2":
        imagemFundo = "url('../../img/fundo_halloweenGame.png')";
        break;
      case "3":
        imagemFundo = "url('../../img/fundo_marGame.png')";
        break;
      default:
        imagemFundo = "url('../../img/fundo_faroesteGame.png')";
        break;
    }

    // Aplica o estilo no body
    body.style.backgroundImage = imagemFundo;
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
  }

  // Função para mostrar o tema vigente
  function mostrarTemaVigente(tema) {
    // Mapeia os IDs dos temas com suas divs correspondentes
    const temas = {
      "0": "tema-faroeste",
      "1": "tema-natal",
      "2": "tema-halloween",
      "3": "tema-mar"
    };

    // Remove a classe `hidden` apenas do tema correspondente
    Object.keys(temas).forEach(key => {
      const temaDiv = document.getElementById(temas[key]);
      if (temaDiv) {
        if (key === tema) {
          temaDiv.classList.remove("hidden");
        } else {
          temaDiv.classList.add("hidden");
        }
      } else {
        console.warn(`Elemento com ID ${temas[key]} não encontrado.`);
      }
    });
  }

  // Atualizar a lógica de inicialização para incluir o fundo do modal
  const temaSalvo = localStorage.getItem("Tema_ID") || "0"; // Faroeste como padrão
  alterarFundo(temaSalvo);
  alterarFundoModal(temaSalvo);
  mostrarTemaVigente(temaSalvo);
  changeTheme(temaSalvo);

  // Função para enviar um palpite
  window.selectLetter = function (letter) {
    fetch("http://hangman-game-backend.azurewebsites.net/party/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Allow-Origin": "*"
      },
      body: JSON.stringify({
        session_id: sessionId,
        player_id: playerId,
        letter: letter
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        showMessage(data.error);
      } else {
        updateGameState(data);
      }
    })
    .catch(error => {
      console.error("Erro ao enviar palpite:", error);
      showMessage("Erro ao enviar palpite.");
    });
  };

  function enableKeyboard() {
    document.querySelectorAll('.key').forEach(button => {
      if (!button.classList.contains('disabled')) {
        button.disabled = false;
      }
    });
  }

  // Desabilita o teclado
  function disableKeyboard() {
    document.querySelectorAll('.key').forEach(button => {
      button.disabled = true;
    });
  }

  // Exibe a tela de fim de jogo
  function showGameOver(data) {
    const modal = document.getElementById("vitoria-modal");
    if (modal) {
      modal.classList.remove("hidden");

      const tempoPartida = document.getElementById("tempo-partida");
      const resultado = document.querySelector(".vitoria-ou-derrota");

      if (data.winner !== null) {
        if (data.winner === myPlayerIndex) {
          resultado.src = "../../img/vitoria.png";
          resultado.alt = "Vitória";
        } else {
          resultado.src = "../../img/derrota.png";
          resultado.alt = "Derrota";
        }
      } else {
        // Empate ou tempo esgotado
        resultado.src = "../../img/empate.png";
        resultado.alt = "Empate";
      }

      // Calcula o tempo decorrido
      const timeElapsed = 90 - data.time_left; // 90 segundos é o tempo total
      tempoPartida.textContent = `Tempo: ${Math.floor(timeElapsed / 60)}:${('0' + (timeElapsed % 60)).slice(-2)}`;

      // Adicionar eventos aos botões "Jogar Novamente" e "Sair"
      document.getElementById("jogar-novamente").addEventListener("click", () => {
        // Recarrega a página para iniciar um novo jogo
        window.location.reload();
      });

      document.getElementById("sair-jogo").addEventListener("click", () => {
        // Fecha a conexão e volta para a página inicial
        socket.close();
        window.location.href = "../../index.html";
      });
    }
  }

  // Função para fechar o modal de configuração
  window.closeConfigModal = function () {
    document.getElementById("config-modal").classList.add("hidden");
  };

  // Função para sair do jogo
  window.exitGame = function () {
    socket.close();
    window.location.href = "../../index.html";
  };

  // Adicionar event listener para o botão de configuração
  document.getElementById("btn-config").addEventListener("click", () => {
    document.getElementById("config-modal").classList.remove("hidden");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  let vidas = 6; // Total de vidas correspondentes às partes da forca
  const palavraSecreta = "COWBOY"; // Palavra padrão
  let palavraAtual = "_".repeat(palavraSecreta.length).split(""); // Representação da palavra oculta
  const forcaImgs = [
    "forca1", "forca2", "forca3", "forca4", "forca5", "forca6"
  ]; // IDs das imagens da forca

  // Atualiza a quantidade de vidas e o estado da forca na interface
  function atualizarForca() {
    forcaImgs.forEach((imgId, index) => {
      const img = document.getElementById(imgId);
      if (img) {
        img.style.display = index === 6 - vidas ? "block" : "none"; // Mostra apenas a parte correspondente
      }
    });
  }

  // Exibe a palavra oculta no centro
  function exibirPalavra() {
    const palavraContainer = document.getElementById("palavra-container");
    palavraContainer.textContent = palavraAtual.join(" ");
  }

  // Clique em uma letra
  window.selectLetter = function (letter) {
    let acertou = false;

    // Valida se a letra faz parte da palavra
    palavraSecreta.split("").forEach((letra, index) => {
      if (letra === letter) {
        palavraAtual[index] = letter;
        acertou = true;
      }
    });

    // Caso erre, perde uma vida
    if (!acertou) {
      vidas -= 1;
      atualizarForca();
      if (vidas <= 0) {
        alert("Você perdeu! A palavra era: " + palavraSecreta);
        window.location.reload();
      }
    }

    exibirPalavra();

    // Verifica se venceu
    if (palavraAtual.join("") === palavraSecreta) {
      alert("Parabéns! Você adivinhou a palavra!");
      window.location.reload();
    }
  };

  // Inicializa o jogo
  function iniciarJogo() {
    vidas = 6; // Reseta as vidas
    palavraAtual = "_".repeat(palavraSecreta.length).split(""); // Reseta a palavra
    exibirPalavra();
    atualizarForca();
  }

  // Inicializa o estado da forca
  atualizarForca();

  iniciarJogo();
});



document.addEventListener("DOMContentLoaded", function () {
  let vidas = 6; // Total de vidas correspondentes às partes da forca
  const palavraSecreta = "COWBOY"; // Palavra padrão
  let palavraAtual = "_".repeat(palavraSecreta.length).split(""); // Representação da palavra oculta
  const forcaImgs = ["forca1", "forca2", "forca3", "forca4", "forca5", "forca6"]; // IDs das imagens da forca
  const timerElement = document.getElementById("timer");
  const turnoIndicador = document.getElementById("turno-indicador");
  let timerInterval;

  // Inicializa o jogador 1 como padrão no localStorage
  if (!localStorage.getItem("User_ID")) {
    localStorage.setItem("User_ID", "1");
  }

  // Atualiza a quantidade de vidas e o estado da forca na interface
  function atualizarForca() {
    forcaImgs.forEach((imgId, index) => {
      const img = document.getElementById(imgId);
      if (img) {
        img.style.display = index === 6 - vidas ? "block" : "none"; // Mostra apenas a parte correspondente
      }
    });
  }

  // Exibe a palavra oculta no centro
  function exibirPalavra() {
    const palavraContainer = document.getElementById("palavra-container");
    palavraContainer.textContent = palavraAtual.join(" ");
  }

  // Alterna o turno entre jogadores
  function alternarTurno() {
    const currentPlayer = localStorage.getItem("User_ID");
    const nextPlayer = currentPlayer === "1" ? "2" : "1";
    localStorage.setItem("User_ID", nextPlayer);
    atualizarTurno(nextPlayer);
    iniciarTimer();
    disableKeyboard(); // Bloqueia o teclado do jogador anterior
  }

  // Atualiza o indicador de turno
  function atualizarTurno(player) {
    turnoIndicador.textContent = `Turno do Jogador ${player}`;
    if (player === localStorage.getItem("User_ID")) {
      enableKeyboard(); // Habilita o teclado para o jogador atual
    }
  }

  // Timer regressivo de 1:30 minutos
  function iniciarTimer() {
    let tempoRestante = 90; // 1 minuto e 30 segundos
    clearInterval(timerInterval); // Reseta qualquer intervalo anterior
    timerInterval = setInterval(() => {
      const minutos = Math.floor(tempoRestante / 60);
      const segundos = tempoRestante % 60;
      timerElement.textContent = `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
      tempoRestante--;

      if (tempoRestante < 0) {
        clearInterval(timerInterval);
        alert(`Tempo esgotado! Passando o turno.`);
        alternarTurno();
      }
    }, 1000);
  }

  // Clique em uma letra
  window.selectLetter = function (letter) {
    const currentPlayer = localStorage.getItem("User_ID");
    let acertou = false;

    // Valida se a letra faz parte da palavra
    palavraSecreta.split("").forEach((letra, index) => {
      if (letra === letter) {
        palavraAtual[index] = letter;
        acertou = true;
      }
    });

    // Caso erre, perde uma vida
    if (!acertou) {
      vidas -= 1;
      atualizarForca();
      if (vidas <= 0) {
        alert(`Jogador ${currentPlayer} perdeu! A palavra era: ${palavraSecreta}`);
        window.location.reload();
      }
    }

    exibirPalavra();

    // Verifica se venceu
    if (palavraAtual.join("") === palavraSecreta) {
      alert(`Parabéns, Jogador ${currentPlayer}! Você adivinhou a palavra!`);
      window.location.reload();
    }

    // Após jogar, passa o turno
    alternarTurno();
  };

  // Habilita o teclado
  function enableKeyboard() {
    document.querySelectorAll(".key").forEach((button) => {
      button.disabled = false;
    });
  }

  // Desabilita o teclado
  function disableKeyboard() {
    document.querySelectorAll(".key").forEach((button) => {
      button.disabled = true;
    });
  }

  // Inicializa o jogo
  function iniciarJogo() {
    vidas = 6; // Reseta as vidas
    palavraAtual = "_".repeat(palavraSecreta.length).split(""); // Reseta a palavra
    exibirPalavra();
    atualizarForca();
    const currentPlayer = localStorage.getItem("Nome");
    atualizarTurno(currentPlayer);
    iniciarTimer(); // Inicia o timer para o primeiro turno
  }

  // Inicializa o estado da forca e do jogo
  iniciarJogo();
});

