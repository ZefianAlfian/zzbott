const { evaluate } = require("mathjs");

const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = async (bot, message, args, from) => {
    const expressions = args.join` `
    const answer = evaluate(expressions);
    bot.sendMessage(from, answer.toString(), text, { quoted: message });
};

exports.help = {
    name: "Math",
    description: "Calculate something",
    usage: "math <expression>",
    cooldown: 5,
};
