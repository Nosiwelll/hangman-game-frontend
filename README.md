
# ProjetoV7 - Atualizações e Estrutura

## 14/11
As divs da forca, poderes e palavras estão devidamente posicionadas na tela `game.html`. No momento, elas estão cada uma com seus devidos PNGs para referência de tamanho e posicionamento. Para encontrar cada uma, buscar por:

```html
<div id="forca-container" class="forca-container">
<div id="palavra-container" class="palavra-container">
<div id="poderes-container" class="poderes-container">
```

## 15/11
Tudo a seguir foi atualizado na versão ProjetoV7:

- **Botões de "VOLTAR":**
  - Os botões das páginas de formulário agora voltam uma página no histórico.
  - Exceção: o botão "VOLTAR AO INÍCIO" da página `redefineSenha.html` retorna à página inicial.

- **Alterações Gerais:**
  - Removido o ícone de configuração da tela `aguardando_jogador.html`.
  - Adicionados placeholders nos campos das páginas: `cadastro.html`, `esqueceuSenha.html`, `redefineSenha.html`.
  - Removido o ícone de perfil da tela `game.html` (modificações só podem ser feitas no lobby).

- **Tela de Configuração:**
  - Adicionado modal na página `lobby.html` com botões:
    - "Menu Principal" (sem funcionalidade no momento).
    - "Sair do Jogo" (leva à página `home.html`).
  - Adicionado modal na página `game.html` com botão:
    - "Sair da Partida" (leva ao lobby, sem interromper a partida).

- **Perfil do Jogador:**
  - Adicionado modal na página `lobby.html` para:
    - Visualizar nome.
    - Alterar nome.
    - Alterar senha.
    - Alterar ícone do perfil.

- **Atualizações na Loja:**
  - Utilidade para diamantes: agora é possível comprar moedas.
  - Novo poder "Distração" (ícone de relógio), disponível na loja e inventários.

- **Tela `game.html`:**
  - Adicionada div para posicionar ícone de perfil do usuário e nome abaixo:
    ```html
    <div id="player-icon" class="player-icon">
    ```

## 16/11
- Adicionada barra de rolagem vertical nas telas de CRUD para acessar botões sem redimensionar a aba.
- Responsividade para resolução de 1280px na tela do jogo via media queries.
- Criada tela de vitória/derrota com classe `.hidden` para esconder elementos:
  ```css
  .hidden {
    display: none;
  }
  ```
- Assets de vitória/derrota para cada tema implementados.
