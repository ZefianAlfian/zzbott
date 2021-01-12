const { readdir } = require('fs')

const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = (bot, message, args, from) => {
    let tmpFile = {}
    readdir(process.cwd() + '/commands', (err, files) => {
        if (err) throw err
        files.forEach((jsFile) => {
            const cmdFile = require(`./${jsFile}`);
            tmpFile[jsFile.replace(".js", "")] = {};
            tmpFile[jsFile.replace(".js", "")].name = cmdFile.help.name;
            tmpFile[jsFile.replace(".js", "")].description = cmdFile.help.description;
            tmpFile[jsFile.replace(".js", "")].usage = cmdFile.help.usage;
        })
        if (!args[0]) {
            bot.sendMessage(from, `*Available commands:* ${Object.keys(tmpFile).join(", ")}\n\n_You can run *help <command name>* to show advanced help._`, text, { quoted: message })
        } else {
            const commandName = args[0];
            const { name, description, usage } = require(`./${commandName}.js`).help;
            bot.sendMessage(from, `*${name}*\n\nDescription: ${description}\nUsage: \`\`\`${usage}\`\`\``, text, { quoted: message })
        };
    })
}

exports.help = {
    name: "Help",
    description: "Show the bot's commands list",
    usage: "help",
    cooldown: 5,
};
