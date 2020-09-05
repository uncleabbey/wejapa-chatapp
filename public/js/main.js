const socket = io();
const messages = document.querySelector(".messages");
const form = document.querySelector("#chat-form");
const ul = document.querySelector(".online-users");


socket.on("message", (message) => {
  console.log(message)
  addMessageToDom(message)
  messages.scrollTop = messages.scrollHeight
})

const { username } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});

socket.emit("addUser", username);

socket.on("users", ({users}) => {
  console.log(users);
  addUsersToDom(users)
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let inputValue = event.target.elements.msg.value;
  socket.emit("chatMessage", inputValue)
  event.target.elements.msg.value = ""
})

const addMessageToDom = ({username, text, time}) => {
  const message = document.createElement("div")
  message.classList.add("message")

  message.innerHTML = `
    <p>${username} <span>${time}</span></p>
    <p>${text}</p>
  `;
  messages.appendChild(message)
}

// Add users to DOM
const addUsersToDom = (users) => {
  // let ul = document.getElementById("users")
  users.forEach(user => {
    let li = document.createElement("li");
    li.innerHTML = user.username;
    ul.appendChild(li);
  })
}