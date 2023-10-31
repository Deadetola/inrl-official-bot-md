//created by @inrl
const {
    inrl,
    truecaller,
} = require('../lib/');
const axios = require('axios');
const {
    BASE_URL
} = require('../config');

inrl({
    pattern: 'true',
    desc: 'To check ping',
    react: "💯",
    type: "search"
}, async (message, client, match) => {
    if (!match && !message.quoted.sender)  return await message.reply('*_need user_*');
        let sender;
        if (message.quoted.sender) sender = message.quoted.sender.split("@s.whatsapp.net")[0];
        let True = match.includes('@') ? match.split('@')[1] : match;
        let search = sender || True;
        if(!search) return await message.send('*Failed*');
        let rslt = await axios(`${BASE_URL}api/truecaller?number=${search}`);
        let msg = await truecaller(rslt);
        return await message.send(msg);
});
