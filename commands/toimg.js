const { spawn } = require('child_process')
const util = require('util')
apiMank = require("../config.json").apiMank
apiNaufal = require("../config.json").apiNaufal
const { MessageType } = require("@adiwajshing/baileys")
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType

exports.run = async (bot, message, args, from) => {
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
        bot.sendMessage(from, teks, text, {quoted: message})
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
    if (!message.quoted) return reply('Tag stikernya!')
    let q = { message: { [message.quoted.mtype]: message.quoted }}
    if (/sticker/.test(message.quoted.mtype)) {
      let sticker = await bot.downloadM(q)
      if (!sticker) throw sticker
      let bufs = []
      let im = spawn('convert', ['webp:-', 'jpeg:-'])
      im.on('error',e =>  reply(util.format(e)))
      im.stdout.on('data', chunk => bufs.push(chunk))
      im.stdin.write(sticker)
      im.stdin.end()
      im.on('exit', () => {
        bot.sendMessage(from, Buffer.concat(bufs), image, {
          quoted: message
        })
      })
    }
};

exports.help = {
    name: "txtporn",
    description: "Make logo pornhub",
    usage: "txtporn teks",
    cooldown: 5,
};
