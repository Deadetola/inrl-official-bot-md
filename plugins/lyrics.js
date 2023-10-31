//result from musixmatcH 
const {
    inrl,
    fetchJson,
    getLang
} = require('../lib');
let lang = getLang()

const {
    BASE_URL
} = require('../config');

inrl({
    pattern: 'lyrics',
    desc: lang.LYRICS.DESC,
    type: "search"
}, async (m,match) => {
try {
    match = match || m.reply_message.text;
    if(!match) return await m.send(lang.BASE.TEXT);
    const res = await fetchJson(BASE_URL+'api/lyrics?text='+match);
    if(!res.status) return m.send(lang.BASE.ERROR.format("Not Found"));
    if(!res.result) return m.send(lang.BASE.ERROR.format(",try again"));
    const { thumb,lyrics,title,artist } = res.result, tbl= "```", tcl ="*_", tdl = "_*";
        const msg = lang.LYRICS.RESPONCE.format(tcl+artist+tdl,tcl+title+tdl)+`\n\n${tbl}${lyrics}${tbl}`;
        return await m.sock.sendMessage(m.from, {
            image: {url : thumb},
            caption :msg
        }, {
            quoted: m
        })
    } catch (e) {
   return await m.send("*_Failed_*");
   }
});
