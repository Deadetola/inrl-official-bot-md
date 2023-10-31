const {
        inrl
} = require("../lib/");
const jimp = require('jimp');
const {
        BASE_URL
} = require("../config");
const axios = require("axios");
const QRReader = require('qrcode-reader')
inrl({
        pattern: 'qr ?(.*)',
        desc: 'qr code reader & generater',
        type: 'plugin'
}, async (message, match) => {
        match = match || message.reply_message.text;
        if (!message.reply_message.image && !match) return await message.reply("_Reply to a qr image/text message_")
        if (message.reply_message.image) {
                const {
                        bitmap
                } = await jimp.read(await message.reply_message.download())
                const qr = new QRReader()
                qr.callback = (err, value) => message.reply(err ?? value.result)
                qr.decode(bitmap)
        } else {
                try {
                        return await message.sendReply(BASE_URL + 'api/qrcode?text=' + match, {
                                caption: "*result for* ```" + match + "```"
                        }, "image");
                } catch (e) {
                        return await message.send("```service unavailable```");
                }
        }
});
