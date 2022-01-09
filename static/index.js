// Reference: https://github.com/iamshaunjp/JavaScript-DOM-Tutorial/blob/lesson-18/app.js

const socket = io();

socket.on("connect", () => {
  console.log("Connected");
});

socket.on("message", (text) => {
  // Create elements
  const li = document.createElement("li");
  const messageName = document.createElement("span");
  const deleteBtn = document.createElement("span");

  // Add text content
  messageName.textContent = text;
  deleteBtn.textContent = "delete";

  // Add classes
  messageName.classList.add("name");
  deleteBtn.classList.add("delete");

  // Append to DOM
  li.appendChild(messageName);
  li.appendChild(deleteBtn);
  list.appendChild(li);
});

const list = document.querySelector("#message-list ul");
const forms = document.forms;

// delete messages
list.addEventListener("click", (e) => {
  if (e.target.className == "delete") {
    const li = e.target.parentElement;
    li.parentNode.removeChild(li);
  }
});

// add messages
const addForm = forms["add-message"];
addForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = addForm.querySelector('input[type="text"]').value;
  addForm.querySelector('input[type="text"]').value = "";
  socket.emit("message", value);
});

// filter messages
const searchBar = forms["search-messages"].querySelector("input");
searchBar.addEventListener("keyup", (e) => {
  const term = e.target.value.toLowerCase();
  const messages = list.getElementsByTagName("li");
  Array.from(messages).forEach((message) => {
    const title = message.firstElementChild.textContent;
    if (title.toLowerCase().indexOf(e.target.value) != -1) {
      message.style.display = "block";
    } else {
      message.style.display = "none";
    }
  });
});
