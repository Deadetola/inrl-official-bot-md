const bgm = require('../media/bgm.json');
const {inrl} = require('../lib');
const {BGMBOT,PREFIX} = require('../config')
inrl({
	on: "text"
}, async (m, match) => {
 if(m?.fromMe) return;
if(m.isBot) return;
if(PREFIX =='false') return;
 let audios=[], mp3, chk=[];
 let add = m.client.body.toLowerCase().trim();
 if(add.includes(' ')){
 add = add.split(' ');
    add.map((p)=>{
    chk.push(p)
    })
    } else {
    chk.push(add)
  }
 if(!BGMBOT) return;
 for (let key in bgm) {
 let a = [];a.push(key)
  a.map((a)=>{
  chk.forEach((c)=>{
  if(c == a.toLowerCase()){
  mp3 = bgm[key];
  audios.push(mp3)
  mp3 = audios[Math.floor(Math.random() * audios.length)];
           }
       })
    })
  }
 if(mp3 === undefined) return;
 return m.sock.sendMessage(m.from,{ audio: { url: mp3.trim() }, mimetype: "audio/mp4",ptt: true}, { quoted: m } );
})
