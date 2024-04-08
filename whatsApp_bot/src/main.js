const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message_create', message => {
    if (message.body.toLocaleLowerCase() === '!oi') {
        client.sendMessage(message.from, 'Bem-vindo(a)');
    }
    console.log('mensaje de: ', message.from, " ", 'Texto: ', message.body)
});

client.initialize();