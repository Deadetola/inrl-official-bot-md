const {
    inrl, TTS,
    getLang
} = require('../lib');
let lang = getLang()

//api simulate same response but its take more time so we just add function on library
inrl({
    pattern: 'tts',
    desc: lang.TTS_DESC,
    react: "💔",
    type: "converter"
}, (async (message, match) => {
    try {
            match = match || message.quoted.text;
        if (!match) return await message.send(lang.BASE.TEXT);
        let slang = match.match('\\{([a-z]+)\\}');
        let lang = "en";
        if (slang) {
            lang = slang[1];
            match = match.replace(slang[0], '');
        }
        let mm = await TTS(match,lang);
        return await message.client.sendMessage(message.from, {
            audio: mm,
            mimetype: 'audio/ogg; codecs=opus',
            ptt: false
        });
    } catch (e) {
        message.reply("_Error, try again!_")
    }
}));
