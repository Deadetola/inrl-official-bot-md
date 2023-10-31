const { TRT, inrl, getLang } = require('../lib');
let lang = getLang()


inrl(
	{
		pattern: 'trt ?(.*)',
		desc: lang.TRT.DESC,
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message.text)
			return await message.send(
				lang.TRT.NEED
			)
                if(!match) return await message.send(lang.TRT.NEED_LANG);
                const {text} = await TRT(message.quoted.text, match)
		return await message.send(text);
	}
)
