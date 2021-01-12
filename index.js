var moment = require('moment-timezone')
var qrcode = require('qrcode-terminal')
var colors = require('colors/safe')
var fs = require('fs')
var _  = require('lodash')

const
{
   ChatModification,
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   waChatKey,
   GroupSettingChange
} = require("@adiwajshing/baileys")

prefix = require("./config.json").prefix

const client = new WAConnection()

const availableCommands = new Set();

fs.readdir("./commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach((commandFile) => {
        availableCommands.add(commandFile.replace(".js", ""));
    });
});

const starts = async aex => {
    aex.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(`[ ! ] Scan kode qr dengan whatsapp!`)
    })

    aex.on('credentials-updated', () => {
        const authInfo = client.base64EncodedAuthInfo()
        console.log(`credentials updated!`)

        fs.writeFileSync('./botane.json', JSON.stringify(authInfo, null, '\t'))
    })

    fs.existsSync('./botane.json') && client.loadAuthInfo('./botane.json')

    aex.connect()

    aex.on('message-new', async message => {
        try {
            global.prefix;

            const from = message.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const type = Object.keys(message.message)[0]

            const id = isGroup ? message.participant : message.key.remoteJid

            const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

            body = (type === 'conversation' && message.message.conversation.startsWith(prefix)) ? message.message.conversation : (type == 'imageMessage') && message.message.imageMessage.caption.startsWith(prefix) ? message.message.imageMessage.caption : (type == 'videoMessage') && message.message.videoMessage.caption.startsWith(prefix) ? message.message.videoMessage.caption : (type == 'extendedTextMessage') && message.message.extendedTextMessage.text.startsWith(prefix) ? message.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? message.message.conversation : (type === 'extendedTextMessage') ? message.message.extendedTextMessage.text : ''

            const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)

            const isBot = client.user.jid
            const owner = '6282299265151@s.whatsapp.net'  // replace owner number
            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId   = isGroup ? groupMetadata.jid : ''
            const isMedia   = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')

            const content = JSON.stringify(message.message)

            const isQuotedImage     = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo     = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio     = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedSticker   = type === 'extendedTextMessage' && content.includes('stickerMessage')
            const isQuotedMessage   = type === 'extendedTextMessage' && content.includes('conversation')

//            if (isGroup && !isMedia) return console.log(`[${colors.bgYellow('GROUP CHAT')}] FROM ${colors.bgMagenta(from)} : ${colors.bgCyan(args.join(' '))}`)

            console.log(availableCommands)

            if (availableCommands.has(argv))
                require(`./commands/${argv}`).run(aex, message, args, from)
        } catch (err) {
            throw err
        }
    })
}

( async () => {
    await starts(client)
})()
