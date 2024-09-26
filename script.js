document.addEventListener("DOMContentLoaded", () => {
  // Função para buscar dados da API
  fetch("http://127.0.0.1:8000/paginainicial/1/") // Substitua pela URL real da API
    .then((response) => response.json())
    .then((data) => {
      // Preencher a Seção 1
      document.getElementById("secao1-titulo").textContent = data.secao1_titulo;
      document.getElementById("secao1-texto").textContent = data.secao1_texto;

      // Preencher a Seção 2
      document.getElementById("secao2-titulo").textContent = data.secao2_titulo;
      document.getElementById("secao2-texto").textContent = data.secao2_texto;

      // Preencher a Seção 3
      document.getElementById("secao3-titulo").textContent = data.secao3_titulo;
      document.getElementById("secao3-texto").textContent = data.secao3_texto;
    })
    .catch((error) => console.error("Erro ao buscar a API:", error));
});
