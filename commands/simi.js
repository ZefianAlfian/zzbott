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
    exports.fetchJson = fetchJson = (url, options) => new Promise(async (resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then(json => {
                // console.log(json)
                resolve(json)
            })
            .catch((err) => {
                reject(err)
            })
    })
    if (args.length < 1) return reply('Simi ga tau kak')
	teks = body.slice(6)
      zeff = await fetchJson(`https://naufalhoster.xyz/tools/simsimi?apikey=${apiNaufal}&pesan=${teks}`, {method: 'get'})
      if (zeff.code == 400) return reply('Simi ga tau kak')
        bot.sendMessage(from, zeff.result.response, text, {quoted: message})
};

exports.help = {
    name: "simi",
    description: "bot setengah manusia",
    usage: "simi teks",
    cooldown: 5,
};
