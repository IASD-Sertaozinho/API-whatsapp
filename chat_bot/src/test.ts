import axios from "axios";
import https from 'https';
import qrcode from "qrcode-terminal";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import { getMessage } from "./api/get_message";
import { getUser } from "./api/get_user";
import { RegisterUser } from "./services/register_user";

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

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

client.on("message", async (msg) => {
  if (msg.body.includes("Olá, me chamo") && msg.body.includes("Gostaria de receber as meditações")) {
    const cel = msg.from;
    RegisterUser({ cel, req: msg.body }).then((response) => {
      console.log(response);
    });

  }
  if (msg.body.includes("!meditacao")) {
    const cel = msg.from;
    const user = await getUser(cel);
    const message_type = user.message;
    const response = await getMessage(message_type);
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
      const image = await axios.get(response.data.image, { responseType: 'arraybuffer', httpsAgent: agent });
      const media = new MessageMedia('image/png', Buffer.from(image.data, 'base64').toString('base64'));
      await client.sendMessage(cel, media, { caption: response.data.titulo + "\n" + response.data.text });
      console.log('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao baixar ou enviar a imagem:', error);
    }
  }
});

client.initialize();
