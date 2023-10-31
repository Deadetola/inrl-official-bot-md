const { inrl } = require('../lib');
const Config = require('../config');
inrl({
        pattern: 'getvar ?(.*)',
        fromMe: true,
        desc: 'show all config var',
        type: 'settings'
}, async (message, match) => {
        let msg = "*_all config vars_*\n\n",
                got = false;
        for (const key in Config) {
                if (key != 'DATABASE' && key != 'BASE_URL' && key != 'HEROKU' && key != 'SESSION_ID') {
                        if (!match) {
                                msg += `_*${key}* : ${Config[key]}_\n`;
                        } else if (match.toUpperCase() == key) {
                                return await message.send(`_*${match.toUpperCase()}* : ${Config[key]}_`);
                                got = true;
                                break;
                        }
                }
        }
        if (match && !got) return await message.send('_thet requested key not found_\n_try *getvar* to get all variables_');
        return await message.send(msg);
});
