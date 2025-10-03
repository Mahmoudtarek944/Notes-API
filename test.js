let inputTitle = document.querySelector(".inptTilte");
let inputDesc = document.querySelector(".inptDesc");
let btnAdd = document.querySelector(".btnAdd");
let tableBody = document.querySelector(".tableBody");

const apiURL = "http://localhost:3000/posts";

async function getNots() {
  let res = await fetch(apiURL);
  let data = await res.json();
  // console.log(data); // array of objects
  return data;
}

async function readNotes() {
  tableBody.innerHTML = "";
  let data = await getNots(); // array of objects
  data.forEach((note) => {
    let newRow = document.createElement("tr");
    let tableDataId = document.createElement("td");
    let textID = document.createTextNode(note.id);
    tableDataId.append(textID);

    let tableDataTitle = document.createElement("td");
    let textTitle = document.createTextNode(note.title);
    tableDataTitle.append(textTitle);

    let tableDataDesc = document.createElement("td");
    let textDesc = document.createTextNode(note.description);
    tableDataDesc.append(textDesc);

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.className =
      "bg-danger border-0 rounded-3 text-light py-1 px-3 text-capitalize";
    deleteBtn.addEventListener("click", () => deleteNote(note.id));

    let updateTitleBtn = document.createElement("button");
    updateTitleBtn.textContent = "Update Title";
    updateTitleBtn.className =
      "bg-success border-0 rounded-3 text-light py-1 px-3 text-capitalize";
    updateTitleBtn.addEventListener("click", () => updateNoteTilte(note.id));

    let updateDescBtn = document.createElement("button");
    updateDescBtn.textContent = "Update Description";
    updateDescBtn.className =
      "bg-success border-0 rounded-3 text-light py-1 px-3 text-capitalize";
    updateDescBtn.addEventListener("click", () => updateNoteDesc(note.id));

    let tableAction = document.createElement("td");
    tableAction.className = "d-flex gap-2 justify-content-evenly";
    tableAction.append(deleteBtn);
    tableAction.append(updateTitleBtn);
    tableAction.append(updateDescBtn);

    newRow.append(tableDataId);
    newRow.append(tableDataTitle);
    newRow.append(tableDataDesc);
    newRow.append(tableAction);
    tableBody.append(newRow);
  });
}

function putAddNotes() {
  btnAdd.addEventListener("click", async () => {
    let title = inputTitle.value;
    let description = inputDesc.value;
    let note = { title, description };
    await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    readNotes();
  });
}

function deleteNote(id) {
  fetch(`${apiURL}/${id}`, {
    method: "DELETE",
  });
  readNotes();
}

async function updateNoteTilte(id) {
  let val = prompt("Uptade Note Title");
  // console.log(val);
  await fetch(`${apiURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: val,
    }),
  });
  readNotes();
}

async function updateNoteDesc(id) {
  let val = prompt("Uptade Note Descrition");
  await fetch(`${apiURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: val,
    }),
  });
}

document.addEventListener("DOMContentLoaded", () => {
  putAddNotes();
  readNotes();
});

// let val = prompt("I love");
// console.log(val);
