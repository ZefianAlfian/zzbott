const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = async (bot, message, args, from) => {
}

exports.help = {
    name: "Stiker",
    description: "Make sticker whatsapp",
    usage: "stiker with image",
    cooldown: 5,
};
