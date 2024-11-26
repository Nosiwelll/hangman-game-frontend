document.getElementById("btn-cad").addEventListener("click", function() {
  // Captura os dados dos campos do formulário
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const login = document.getElementById("login").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmar-senha").value;

  // Verifica se todos os campos estão preenchidos
  if (!nome || !email || !login || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
  }

  // Validação do email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
  }

  // Salva os dados do usuário no localStorage
  localStorage.setItem("user_" + login, JSON.stringify({ nome, email, senha }));
  alert("Cadastro realizado com sucesso!");

  // Redireciona para a página de login
  window.location.href = "login.html";
});
