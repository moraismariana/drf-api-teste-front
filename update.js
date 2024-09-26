// Função para buscar os dados da API e preencher os inputs com os dados existentes
function preencherFormulario() {
  fetch("http://127.0.0.1:8000/paginainicial/1/") // Substitua pela URL da sua API
    .then((response) => response.json())
    .then((data) => {
      // Preenche os inputs com os dados da API
      document.getElementById("secao1_titulo").value = data.secao1_titulo;
      document.getElementById("secao1_texto").value = data.secao1_texto;
      document.getElementById("secao2_titulo").value = data.secao2_titulo;
      document.getElementById("secao2_texto").value = data.secao2_texto;
      document.getElementById("secao3_titulo").value = data.secao3_titulo;
      document.getElementById("secao3_texto").value = data.secao3_texto;
    })
    .catch((error) => {
      console.error("Erro ao buscar dados da API:", error);
    });
}

// Função para enviar os dados atualizados à API
document
  .getElementById("update-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Capturar os valores dos inputs
    const data = {
      secao1_titulo: document.getElementById("secao1_titulo").value,
      secao1_texto: document.getElementById("secao1_texto").value,
      secao2_titulo: document.getElementById("secao2_titulo").value,
      secao2_texto: document.getElementById("secao2_texto").value,
      secao3_titulo: document.getElementById("secao3_titulo").value,
      secao3_texto: document.getElementById("secao3_texto").value,
    };

    // Enviar os dados atualizados para a API usando método PUT ou PATCH
    fetch("http://127.0.0.1:8000/paginainicial/1/", {
      method: "PUT", // Use PATCH se quiser atualizar apenas campos específicos
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Atualização bem-sucedida:", result);
        alert("Informações atualizadas com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a API:", error);
        alert("Erro ao atualizar as informações.");
      });
  });

// Executa a função de preencher o formulário assim que a página carrega
document.addEventListener("DOMContentLoaded", preencherFormulario);
