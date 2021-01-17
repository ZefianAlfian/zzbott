const fetch = require("node-fetch")

const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = async (bot, message, args, from) => {
    fetch(encodeURI(`https://docs-jojo.herokuapp.com/api/renungan`))
			.then(response => response.json())
			.then(data => {
    bot.sendMessage(from,  `Renungan\n\nJudul : ${data.judul} \n\nRenungan : ${data.Isi} \n\nPesan : ${data.pesan}`, text, { quoted: message });
});
};

exports.help = {
    name: "renungan",
    description: "Cerita untuk renungan",
    usage: "renungan",
    cooldown: 5,
};
