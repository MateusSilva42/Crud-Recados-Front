const btnExit = document.querySelector("#exit");
const btnNewNote = document.querySelector("#new-note-btn");

let page = 1;
let userNotes = [];

function isLogged() {
  const logged = localStorage.getItem("currentUser");

  if (!logged) {
    window.location.href = "index.html";
  }
}

btnExit.addEventListener("click", () => {
  localStorage.removeItem("currentUser");
  window.location.reload();
});

btnNewNote.addEventListener("click", () => {
  alert("Em Breve. Por enquanto, crie as notas pela API ;)");
});

function editNotes() {
  const btnEdit = document.querySelectorAll(".edit-btn");

  btnEdit.forEach((item) => {
    item.addEventListener("click", () => {
      alert("Em breve. Por enquanto edite os recados pela API ;)");
    });
  });
}

function deleteNotes() {
  const btnDelete = document.querySelectorAll(".delete-btn");

  btnDelete.forEach((item) => {
    item.addEventListener("click", () => {
      alert("Em breve. Por enquanto delete os recados pela API ;)");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotes(page);
  renderPagesBtn();
});

async function renderNotes(page) {
  userNotes = [];

  const notesTable = document.querySelector("#notes-table");
  notesTable.innerHTML = "";

  userNotes.innerText = "";

  await getNotes(page).then((res) => {
    res.Data.forEach((item) => {
      userNotes.push(item);
    });
  });

  if (userNotes.length === 0) {
    const noNotes = document.createElement("h2");
    noNotes.innerText =
      "Nenhum recado encontrado para o seu usuário. Cadastre a sua primeira nota.";

      notesTable.appendChild(noNotes)
    return;
  }

  userNotes.forEach((note) => {
    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    tdTitle.classList.add("td-center");
    tdTitle.innerText = note.titulo;

    const tdDescription = document.createElement("td");
    tdDescription.classList.add("td-description");
    tdDescription.innerText = note.descricao;

    const tdEdit = document.createElement("td");
    const tdBtnEdit = document.createElement("button");
    tdBtnEdit.value = "Editar";
    tdBtnEdit.classList.add("edit-btn");
    tdBtnEdit.innerText = "Editar";

    const tdDelete = document.createElement("td");
    const tdBtnDelete = document.createElement("button");
    tdBtnDelete.value = "Excluir";
    tdBtnDelete.classList.add("delete-btn");
    tdBtnDelete.innerText = "Excluir";

    tdEdit.appendChild(tdBtnEdit);
    tdDelete.appendChild(tdBtnDelete);

    tr.appendChild(tdTitle);
    tr.appendChild(tdDescription);
    tr.appendChild(tdEdit);
    tr.appendChild(tdDelete);

    notesTable.appendChild(tr);
  });

   editNotes()
   deleteNotes()
}

async function renderPagesBtn() {
  const divPages = document.querySelector("#pages-btn");

  getNotes().then((res) => {
    let totalPages = res.TotalPaginas;

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.innerText = i;
      pageBtn.value = i;
      pageBtn.classList.add("btn-page");

      pageBtn.onclick = () => {
        page = pageBtn.value;
        renderNotes(page);

        return page;
      };

      divPages.appendChild(pageBtn);
    }
  });
}

async function getNotes(page) {
  try {
    const response = await api.get("/listar-meus-recados", {
      params: {
        pagina: page,
      },
    });
    return response.data;
  } catch (error) {
    alert(error.response.data.Message);
    return false;
  }
}

isLogged();
editNotes();
deleteNotes();
