const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (bot, message, args, from) => {
    bot.sendMessage(from, "🏓 PONG!", text, { quoted: message });
};

exports.help = {
    name: "Ping",
    description: "PING PONG",
    usage: "ping",
    cooldown: 5
};
