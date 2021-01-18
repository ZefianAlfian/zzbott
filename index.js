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

const welcome = JSON.parse(fs.readFileSync('./welcome.json'))

const getGroupAdmins = (participants) => {
    admins = []
    for (let i of participants) {
        i.isAdmin ? admins.push(i.jid) : ''
    }
    return admins
}


const fetch = require('node-fetch')
const axios = require('axios')
const chalk = require('chalk')
const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
const getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (e) {
        console.log(`Error : ${e}`)
    }
}

const availableCommands = new Set();

fs.readdir("./commands", (e, files) => {
    if (e) return console.error(e);
    files.forEach((commandFile) => {
        availableCommands.add(commandFile.replace(".js", ""));
    });
});

const starts = async riz => {
    riz.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(`[ ! ] Scan kode qr dengan whatsapp!`)
    })

    riz.on('credentials-updated', () => {
        const authInfo = client.base64EncodedAuthInfo()
        console.log(`credentials updated!`)

        fs.writeFileSync('./session-zefian.json', JSON.stringify(authInfo, null, '\t'))
    })

    fs.existsSync('./session-zefian.json') && client.loadAuthInfo('./session-zefian.json')

    riz.connect()
    blocked = []
    riz.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us','s.whatsapp.net'))
        }
    })
    riz.on('group-participants-update', async (anu) => {
    if (!welcome.includes(anu.jid)) return
    try {
        const mdata = await riz.groupMetadata(anu.jid)
        console.log(anu)
        if (anu.action == 'add') {
            num = anu.participants[0]
            try {
                ppimg = await riz.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
            } catch {
                ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
            }
            teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
            let buff = await getBuffer(ppimg)
            riz.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
        } else if (anu.action == 'remove') {
            num = anu.participants[0]
            try {
                ppimg = await riz.getProfilePicture(`${num.split('@')[0]}@c.us`)
            } catch {
                ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
            }
            teks = `Sayonara @${num.split('@')[0]}👋`
            let buff = await getBuffer(ppimg)
            riz.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
        }
    } catch (e) {
        console.log('Error : %s', color(e, 'red'))
    }
})
    riz.on('message-new', async message => {
        try {
            global.prefix;
            global.blocked
            
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`
            }
            const from = message.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const ttext = message.message.conversation
            const type = Object.keys(message.message)[0]
            const mess = {
                wait: 'Sedang di Prosess ⌛',
                success: 'Berhasil ✔️',
                gagal: 'Gagal ❌',
                stick: 'Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
                Iv: 'Link tidak valid ❌',
                mt: 'Command Dalam Tahap Perbaikan ❌',
                only: {
                    group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
                    ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
                    ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
                    admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
                    Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
                }
            }
            const reply = (teks) => {
                riz.sendMessage(from, teks, text, {quoted: message})
            }

            const id = isGroup ? message.participant : message.key.remoteJid

            const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

            body = (type === 'conversation' && message.message.conversation.startsWith(prefix)) ? message.message.conversation : (type == 'imageMessage') && message.message.imageMessage.caption.startsWith(prefix) ? message.message.imageMessage.caption : (type == 'videoMessage') && message.message.videoMessage.caption.startsWith(prefix) ? message.message.videoMessage.caption : (type == 'extendedTextMessage') && message.message.extendedTextMessage.text.startsWith(prefix) ? message.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? message.message.conversation : (type === 'extendedTextMessage') ? message.message.extendedTextMessage.text : ''

            const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)

            const isBot = riz.user.jid
            const owner = '6289630171792@s.whatsapp.net'  // replace owner number
            const groupMetadata = isGroup ? await riz.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId   = isGroup ? groupMetadata.jid : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(isBot) || false
            const isGroupAdmins = groupAdmins.includes(id) || false
            const isWelcome = isGroup ? welcome.includes(from) : false
            const isMedia   = (type === 'imageMessage' || type === 'videoMessage' || type === 'audioMessage')

            const content = JSON.stringify(message.message)

            const isQuotedImage     = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo     = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio     = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuotedSticker   = type === 'extendedTextMessage' && content.includes('stickerMessage')
            const isQuotedMessage   = type === 'extendedTextMessage' && content.includes('conversation')

//            if (isGroup && !isMedia) return console.log(`[${colors.bgYellow('GROUP CHAT')}] FROM ${colors.bgMagenta(from)} : ${colors.bgCyan(args.join(' '))}`)

            console.log(availableCommands)
            if (ttext.includes('#help')){
                zef.sendMessage(from, "use /help", text, {quoted: message})
            }
            if (ttext.includes('/welcome')){
                if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelcome) return reply('Udah aktif um')
						welcome.push(from)
						fs.writeFileSync('../welcome.json', JSON.stringify(welcome))
						reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						welcome.splice(from, 1)
						fs.writeFileSync('../welcome.json', JSON.stringify(welcome))
						reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
            }
            if (availableCommands.has(argv))
                require(`./commands/${argv}`).run(riz, message, args, from, getRandom, isMedia, isQuotedImage, isQuotedVideo, isQuotedAudio, isQuotedSticker, isQuotedMessage)
        } catch (err) {
            throw err
        }
    })
}

( async () => {
    await starts(client)
})()
