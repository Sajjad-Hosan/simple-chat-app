const socket = io();
const pName = document.querySelector(".profile_name");
const messageArea = document.querySelector(".message_area");
const sendButton = document.querySelector(".btn");
const chatSection = document.querySelector(".chat_section");

let userName;
do {
  userName = prompt("Write your name: ");
} while (!userName);

pName.textContent = userName;
sendButton.addEventListener("click", (e) => {
  sendMessage(messageArea.value);
});

const sendMessage = (message) => {
  let msg = {
    user: userName,
    message: message.trim(),
  };
  // append the message
  appendMessage(msg, "outgoing");
  messageArea.value = "";

  // send to server
  socket.emit("message", msg);
};

const appendMessage = (msg, type) => {
  let messageBody = document.createElement("div");
  messageBody.classList.add(type, "message_box");
  let markUp = `
     <img
            src="https://pics.craiyon.com/2023-10-09/586a631238574c7ead38a04260976ce8.webp"
            alt=""
            height="28"
          />
          <p class="message">${msg.message}</p>
    `;
  messageBody.innerHTML = markUp;
  chatSection.appendChild(messageBody);
};

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  console.log(msg);
});

const scrollToBottom = () => {
  messageArea.scrollTop = messageArea.scrollHeight;
};
