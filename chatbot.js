function toggleChat() {
    var chatbox = document.getElementById("chatbot");
    if (chatbox.style.display === "none" || chatbox.style.display === "") {
        chatbox.style.display = "block";
    } else {
        chatbox.style.display = "none";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    var inputField = document.getElementById("chat-input");
    var chatBody = document.getElementById("chat-body");
    var userMessage = inputField.value.trim();

    if (userMessage === "") return;

    var userDiv = document.createElement("div");
    userDiv.className = "chat-message user";
    userDiv.innerHTML = "<strong>User:</strong> " + userMessage;
    chatBody.appendChild(userDiv);

    inputField.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        fetchBotResponse(userMessage);
    }, 1000);
}

function fetchBotResponse(userMessage) {
    fetch("responses.json")
        .then(response => response.json())
        .then(data => {
            var botResponse = data[userMessage.toLowerCase()] || "I'm sorry, I didn't understand that. Can you please rephrase?";
            var botDiv = document.createElement("div");
            botDiv.className = "chat-message bot";
            botDiv.innerHTML = "<strong>Rishi:</strong> " + botResponse;
            document.getElementById("chat-body").appendChild(botDiv);
            document.getElementById("chat-body").scrollTop = document.getElementById("chat-body").scrollHeight;
        })
        .catch(error => console.error("Error fetching chatbot responses:", error));
}