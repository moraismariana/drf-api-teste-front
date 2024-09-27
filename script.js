document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://127.0.0.1:8000/paginainicial/1/";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("secao1-titulo").innerText = data.secao1_titulo;
      document.getElementById("secao1-texto").innerText = data.secao1_texto;
      document.getElementById("secao2-titulo").innerText = data.secao2_titulo;
      document.getElementById("secao2-texto").innerText = data.secao2_texto;
      document.getElementById("secao3-titulo").innerText = data.secao3_titulo;
      document.getElementById("secao3-texto").innerText = data.secao3_texto;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
});
