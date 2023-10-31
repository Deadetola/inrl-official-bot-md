const {
	inrl,
	extractUrlsFromString,
	getLang
} = require('../lib');
let lang = getLang()

const {
	BASE_URL
} = require('../config');
const axios = require('axios');

function isInstagramURL(url) {
	var pattern = /^https?:\/\/(www\.)?instagram\.com\/.*/i;
	return pattern.test(url);
}

inrl({
	pattern: 'insta ?(.*)',
	desc: lang.INSTA.DESC,
	react: "😛",
	type: "download",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send(lang.INSTA.NEED_URL);
	const urls = extractUrlsFromString(match);
	if (!urls[0]) return await message.send(lang.INSTA.NOT_VALID);
	if (!isInstagramURL(urls[0])) return await message.send(lang.INSTA.NEED_URL);
	let {
		data
	} = await axios(BASE_URL + 'api/insta?url=' + urls[0]);
	const {
		result
	} = data;
	if (!result[0]) return await message.send(lang.BASE.ERROR.format("Not Found"));
	result.map(async (u) => await message.sendFromUrl(u).catch((e) => message.reply(lang.BASE.FAILD)));
});

inrl({
	pattern: 'story ?(.*)',
	desc: lang.INSTA.DESC,
	react: "😉",
	type: "download",
}, async (message, match) => {
	match = match || message.reply_message.text;
	if (!match) return await message.send(lang.INSTA.NEED_URL);
	const urls = extractUrlsFromString(match);
	if (!urls[0]) return await message.send(lang.INSTA.NOT_VALID);
	if (!isInstagramURL(urls[0])) return await message.send(lang.INSTA.NEED_URL);
	let {
		data
	} = await axios(BASE_URL + 'api/insta?url=' + urls[0]);
	const {
		result
	} = data;
	if (!result[0]) return await message.send(lang.BASE.ERROR.format("Not Found"));
	result.map(async (u) => await message.sendFromUrl(u).catch((e) => message.reply(lang.BASE.FAILD)))
});
