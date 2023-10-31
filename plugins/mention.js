const {inrl,mention,getVar,UpdateVariable} = require('../lib');
const {BASE_URL} = require('../config');
inrl({
    pattern: 'mention ?(.*)',
    on: "all",
    allowBot: true,
    fromMe: 'public'
}, async (message, match) => {
    if(message.client.isCreator && message.client.command.includes('mention') && !message.isBot && match.toLowerCase() == 'get') {
        return await message.send(`_${await getVar('MENTION',message.client.user.number)}_`);
    } else if(message.client.isCreator && message.client.command.includes('mention') && !message.isBot) {
        if(!match) return await message.send(`*_check formats_*\n_${BASE_URL}info/bot/vars_\n_*mention* get_`)
        await UpdateVariable('mention',match,message.client.user.number)
        return await message.send('_mention updated_');
    }
if(!message.client.mention.isOwner) return;
const content = await getVar('MENTION',message.client.user.number)
if(!content || (content == 'null') || (content == 'false') || (content == 'off')) return;
return await mention(message,content).catch(e=>console.log(e))
});
