import QRCode from 'qrcode';
import { phone_number } from "./env.checker";

async function generateQrCodeForRegistration() {
  // Definir o número e a mensagem
  const number = phone_number;
  const message_comum = 'Olá, me chamo (seu nome). Gostaria de receber as meditações dos adultos';
  const message_jovem = 'Olá, me chamo (seu nome). Gostaria de receber as meditações dos jovens';
  const message_mulher = 'Olá, me chamo (seu nome). Gostaria de receber as meditações das mulheres';

  // Codificar a mensagem em URL
  const encoded_comum = encodeURIComponent(message_comum);
  const encoded_jovem = encodeURIComponent(message_jovem);
  const encoded_mulher = encodeURIComponent(message_mulher);

  // Construir a URL do WhatsApp
  const whatsappUrl_comum = `https://wa.me/${number}/?text=${encoded_comum}`;
  const whatsappUrl_jovem = `https://wa.me/${number}/?text=${encoded_jovem}`;
  const whatsappUrl_mulher = `https://wa.me/${number}/?text=${encoded_mulher}`;

  // Gerar o QR Code e salvar em um arquivo
  try {
    await QRCode.toFile('messagem_comum.png', whatsappUrl_comum, {
      color: {
        dark: '#000',  // Cor do QR code
        light: '#FFF'  // Cor de fundo do QR code
      }
    });
    console.log('QR Code gerado e salvo como "messagem_comum.png".');

    await QRCode.toFile('messagem_jovem.png', whatsappUrl_jovem, {
      color: {
        dark: '#000',  // Cor do QR code
        light: '#FFF'  // Cor de fundo do QR code
      }
    });
    console.log('QR Code gerado e salvo como "messagem_jovem.png".');

    await QRCode.toFile('messagem_mulher.png', whatsappUrl_mulher, {
      color: {
        dark: '#000',  // Cor do QR code
        light: '#FFF'  // Cor de fundo do QR code
      }
    });
    console.log('QR Code gerado e salvo como "messagem_mulher.png".');
  } catch (err) {
    console.error('Erro ao gerar QR Code', err);
  }
}

generateQrCodeForRegistration()
  .then(() => console.log('QR Codes gerados com sucesso!'))
  .catch((err) => console.error('Erro ao gerar QR Codes', err));
