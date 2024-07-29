client.on("ready", async () => {
  console.log("Client is ready!");

  const number = "5516992220902"; // Número de telefone no formato E.164
  const message = "Olá, isso é uma mensagem automática!";

  try {
    const contact = await client.getNumberId(number); // Verifica se o número é válido
    if (contact) {
      const chatId = contact._serialized; // Obtém o chatId no formato correto
      await client.sendMessage(chatId, message);
      console.log('Message sent successfully');
    } else {
      console.log('Invalid number');
    }
  } catch (err) {
    console.error('Error sending message', err);
  }
});

client.on("message", (message) => {
  if (message.body === "ping") {
    message.reply("pong");
  }
});

client.initialize();
