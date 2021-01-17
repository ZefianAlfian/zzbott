const fetch = require("node-fetch")

const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = async (bot, message, args, from) => {
    fetch(encodeURI(`https://twindev.herokuapp.com/api/v1/covid/indonesia`))
			.then(response => response.json())
			.then(data => {
    bot.sendMessage(from,  `Covid19 In Indonesia\n\nPositif : ${data.positif} \nSembuh : ${data.sembuh} \nMeninggal : ${data.meninggal}`, text, { quoted: message });
});
};

exports.help = {
    name: "Covid19",
    description: "Show Data Covid19 in Indonesia",
    usage: "covid19",
    cooldown: 5,
};
