document.addEventListener("DOMContentLoaded", function () {
  const chatToggleBtn = document.getElementById("chatToggleBtn");
  const chatBoxWidget = document.getElementById("chatBoxWidget");
  const chatCloseBtn = document.getElementById("chatCloseBtn");
  const chatInputField = document.getElementById("chatInputField");
  const chatMessagesContainer = document.getElementById(
    "chatMessagesContainer"
  );
  const chatSendBtn = document.getElementById("chatSendBtn");

  chatToggleBtn.addEventListener("click", () => {
    chatBoxWidget.classList.toggle("hidden");
  });

  chatCloseBtn.addEventListener("click", () => {
    chatBoxWidget.classList.add("hidden");
  });

  chatSendBtn.addEventListener("click", async () => {
    const userInput = chatInputField.value.trim();
    if (!userInput) return;

    // Tambahkan pesan user (di kiri)
    const userMsg = document.createElement("p");
    userMsg.className =
      "bg-gray-100 text-gray-800 p-3 rounded-2xl w-max max-w-[80%] shadow self-start";
    userMsg.textContent = userInput;
    chatMessagesContainer.appendChild(userMsg);
    chatInputField.value = "";
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Tambahkan pesan loading bot (di kanan)
    const loadingMsg = document.createElement("p");
    loadingMsg.className =
      "bg-blue-100 text-gray-700 italic p-3 rounded-2xl w-max max-w-[80%] shadow self-end";
    loadingMsg.textContent = "DoridoBot sedang mengetik...";
    chatMessagesContainer.appendChild(loadingMsg);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

    // Delay biar kayak ngetik beneran
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Hapus loading dan ganti dengan jawaban bot
    loadingMsg.remove();

    const botMsg = document.createElement("p");
    botMsg.className =
      "bg-sky-100 text-gray-800 p-3 rounded-2xl w-max max-w-[80%] shadow self-end";
    botMsg.textContent =
      "Maaf untuk saat ini DoridoBot dalam proses pengembangan!";
    chatMessagesContainer.appendChild(botMsg);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  });

  chatInputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      chatSendBtn.click();
    }
  });
});
