const fs = require("fs")
const fetch = require('node-fetch')
const axios = require('axios')
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
    //if (args.length < 1) return reply('Where the text?')
	//				teks = body.slice(13)
	//				reply(mess.wait)
      //              buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/blackpink?text=${teks}`)
        //			bot.sendMessage(from, buff, image, {quoted: message, caption: "Berhasil"})
        reply(mess.mt)
};

exports.help = {
    name: "txtblackpink",
    description: "Make logo blackpink",
    usage: "txtblackpink teks",
    cooldown: 5,
};
