const {
  inrl,
  getLang
} = require('../lib');
let lang = getLang()
const {STICKER_DATA} = require('../config');
const fs = require("fs");
const path = require("path");

inrl(
  {
    pattern: "sticker",
    desc: lang.STICKER.DESC,
    react: "🔁",
    type : 'converter',
    usage : "to convert short video or image to sticker fromate, ex:- sticker[repleyed_msg]"
  },
  async (message, match) => {
    if (!/image|video|webp/.test(message.client.mime)) return await message.send(
      lang.STICKER.ERROR
        );
    try {
     if (message.quoted.mime) {
      await message.send(lang.BASE.WAIT)
        let download = await message.quoted.download();
        return await message.sendSticker(message.jid, download, {
          author: STICKER_DATA.split(/[|;,]/)[0] || STICKER_DATA,
          packname: STICKER_DATA.split(/[|;,]/)[1],
        });
      } else if (/image|video|webp/.test(message.client.mime)) {
        await message.send(lang.BASE.WAIT)
        let download = await message.client.downloadMediaMessage(message);
        return await message.sendSticker(message.jid, download, {
          author: STICKER_DATA.split(/[|;,]/)[0] || STICKER_DATA,
          packname: STICKER_DATA.split(/[|;,]/)[1],
        });
      } else {
        return await message.send(
          lang.STICKER.ERROR
        );
      }
    } catch (error) {
      return await message.send(
        error
      );
    }
  }
);
