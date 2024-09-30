document.addEventListener("DOMContentLoaded", async () => {
  // Verifica se o usuário está autenticado
  const token = localStorage.getItem("accessToken");

  if (!token) {
    alert("Você precisa estar autenticado para editar.");
    window.location.href = "./login.html";
    return;
  }

  // Verifica se o token ainda é válido
  try {
    const verifyResponse = await fetch("http://127.0.0.1:8000/paginainicial/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!verifyResponse.ok) {
      // Token expirou ou é inválido, redirecionar para o login
      alert("Sessão expirada. Por favor, faça login novamente.");
      localStorage.removeItem("accessToken");
      window.location.href = "./login.html";
      return;
    }

    console.log("Acesso permitido!");
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    window.location.href = "./login.html";
    return;
  }

  const apiUrl = "http://127.0.0.1:8000/paginainicial/1/";

  // Preenche o formulário com os dados atuais da API
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao carregar dados da API.");
    }

    const data = await response.json();
    document.getElementById("secao1_titulo").value = data.secao1_titulo;
    document.getElementById("secao1_texto").value = data.secao1_texto;
    document.getElementById("secao2_titulo").value = data.secao2_titulo;
    document.getElementById("secao2_texto").value = data.secao2_texto;
    document.getElementById("secao3_titulo").value = data.secao3_titulo;
    document.getElementById("secao3_texto").value = data.secao3_texto;
  } catch (error) {
    console.error("Erro ao carregar dados para edição:", error);
    alert("Erro ao carregar dados.");
  }

  // Atualiza os dados na API
  document
    .getElementById("update-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const updatedData = {
        secao1_titulo: document.getElementById("secao1_titulo").value,
        secao1_texto: document.getElementById("secao1_texto").value,
        secao2_titulo: document.getElementById("secao2_titulo").value,
        secao2_texto: document.getElementById("secao2_texto").value,
        secao3_titulo: document.getElementById("secao3_titulo").value,
        secao3_texto: document.getElementById("secao3_texto").value,
      };

      try {
        const updateResponse = await fetch(apiUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(updatedData),
        });

        if (!updateResponse.ok) {
          throw new Error("Erro ao atualizar a API.");
        }

        const data = await updateResponse.json();
        alert("Conteúdo atualizado com sucesso!");
        // Redirecionar para a página de edição
        window.location.href = "./";
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        alert("Você não tem permissão para atualizar os dados.");
      }
    });
});
