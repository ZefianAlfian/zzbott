const fetch = require("node-fetch")

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
    reply(mess.wait)
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
