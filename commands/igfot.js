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
    if (args.length < 1) return reply('Where the url?')
    if (!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply(mess.Iv)
    reply(mess.wait)
    rarajelekjahat = await fetchJson(`https://mhankbarbar.tech/api/ig?url=${args[0]}&apiKey=${apiMank}`, {method: 'get'})
    if (rarajelekjahat.error) return reply(rarajelekjahat.error)
    rahmababikontol = await getBuffer(rarajelekjahat.result)
    bot.sendMessage(from, rahmababikontol, image, {quoted: message, caption: mess.success})


};

exports.help = {
    name: "igvid",
    description: "Download Video Instagram",
    usage: "igvid link",
    cooldown: 5,
};
