const axios = require('axios'); 
const cheerio = require('cheerio'); 
const dayjs = require('dayjs'); 
const CronJob = require('cron').CronJob; 
const { Telegraf } = require('telegraf')
require('dotenv').config();
const { telegrafThrottler } = require('telegraf-throttler');

const bot = new Telegraf(process.env.TELEGRAM_YOUR_API)
const throttler = telegrafThrottler();

require('dayjs/locale/tr'); 
dayjs.locale('tr');

const menu = []; 

const getMenuNightJob = new CronJob('01 00 * * *', async () => { 
  for (var i = menu.length; i > 0; i--) {
    menu.pop();
   }
  await setMenuOfMonth();
});

const getMenuNotificationJob = new CronJob('00 09 * 0-5,8-11 1-5', async () => { 
  bot.telegram.sendMessage(process.env.TELEGRAM_GROUP_ID, await getTodayMenu(), {parse_mode: 'Markdown'}, {disable_notification: false}); 
});

async function setMenuOfMonth() { 
    
    let menuData = { 
    date: '', foods: [], nomeals: '', totalcalorie: ''
  };
  try{
  const { data } = await axios.get(process.env.MENU_URL); 
  const $ = cheerio.load(data); 

  $('.table-fixed tr:not(:first) td').each((index, element) => { 
  
      menuData.date = $(element).children('h4').text().trim(); 
      menuData.nomeals = $(element).children('b').text().trim();
      menuData.totalcalorie = $(element).find('.row:last b').text().trim();

      $(element).find('.row:first ul li').each((index, element) => {
        menuData.foods.push($(element).text().trim());
      });
      
      menu.push({ ...menuData }); 
      menuData = {date: '', foods: [], nomeals: '', totalcalorie: '' };
      
    //console.log(`${menu[0].date}`);
  });
}
  catch(err){
    //console.log(err);
  }  
} 


function convertDateFormat(date) { 
  return date.format('D MMMM');
}

async function getMenuByYesterday(menuYesterday) { 
  menuYesterday = convertDateFormat(menuYesterday);  
  return await menu.find(({ date }) => {
    return date === menuYesterday; 
  });
}

async function getYesterdayMenu() { 
  const yesterdayMenu = await getMenuByYesterday(dayjs().add(-1, 'day'));
  if (typeof yesterdayMenu == 'undefined') return '😶 Dün için menü bilgisi bulunmuyor.';
  return convertToList(yesterdayMenu); 
}

async function getMenuByDate(menuToday) { 
  menuToday = convertDateFormat(menuToday);
  return await menu.find(({ date }) => { 
    return date === menuToday; 
  });
}

async function getTodayMenu() { 
  const todayMenu = await getMenuByDate(dayjs());
  if (typeof todayMenu == 'undefined') return '😶 Bugün için menü bilgisi bulunmuyor.'; 
  return convertToList(todayMenu); 
}

async function getMenuByTomorrow(menuTomorrow) { 
  menuTomorrow = convertDateFormat(menuTomorrow);
  return await menu.find(({ date }) => {
    return date === menuTomorrow;
  });
}

async function getTomorrowMenu() { 
  const tomorrowMenu = await getMenuByTomorrow(dayjs().add(+1, 'day'));
  if (typeof tomorrowMenu == 'undefined') return '😶 Yarın için menü bilgisi bulunmuyor.';
  return convertToList(tomorrowMenu);
}


async function getMenuOfWeek() {
  const DAY_COUNT_OF_WEEK = 7;
  const menuOfWeek = [];
  let menu = null;
  let startDateOfWeek = dayjs().startOf('week');

  for (let i = 1; i < DAY_COUNT_OF_WEEK; i++) {
    menu = await getMenuByDate(startDateOfWeek);
    if (typeof menu != 'undefined') menuOfWeek.push(menu);
    startDateOfWeek = startDateOfWeek.add(1, 'day');
  }

  let convertedList = '';
  menuOfWeek.forEach(item => {
    convertedList += convertToList(item);
  });
  if (convertedList == '') return 'Menü Güncelleniyor...';
  return convertedList;
}

async function getMenuOfMonth() { 
  const DAY_COUNT_OF_MONTH = 31; 
  const menuOfMonth = []; 
  let menu = null; 
  let startDateOfMonth = dayjs().startOf('month');

  for (let i = 0; i < DAY_COUNT_OF_MONTH; i++) {
    menu = await getMenuByDate(startDateOfMonth);
    if (typeof menu != 'undefined') menuOfMonth.push(menu);
    startDateOfMonth = startDateOfMonth.add(1, 'day');
  }

  let convertedList = '';
  menuOfMonth.forEach(item => {
    convertedList += convertToList(item);
  });
  if (convertedList == '') return 'Menü Güncelleniyor...';
  return convertedList;
}


function convertToList(menu) { 
return `
🍽 *${menu.date.toLocaleUpperCase('TR')}* 🍽
———————————
• ${menu.foods.join("\n• ")}${menu.nomeals.toUpperCase().replace("ÖĞÜN YOK", "ÖĞÜN YOK (resmi tatil)")}
_${menu.totalcalorie.replace("Toplam Kalori", "➥ toplam kalori")}_\n`;
}



async function startBot() {

bot.use(throttler);

bot.start(async (ctx) => { bot.telegram.sendMessage(ctx.chat.id,`Selamün Aleyküm *${ctx.from.first_name}* 🙂 hoş geldin

Bot aracılığı ile Konya Teknik Üniversitesi yemekhane menüsünü öğrenebilir, yemekhane ile ilgili bilgilere ulaşabilirsiniz.

Tüm komutları görüntülemek için */komutlar* komutunu kullanabilir veya alttaki *☰ Menü* bölümünü kullanabilirsiniz.

Yemekhane rezervasyonunu aşağıdaki butona tıklayarak gerçekleştirebilirsiniz.`,
  {parse_mode: 'Markdown', reply_markup:{inline_keyboard: [[{text: "YEMEK REZERVASYON SİSTEMİ", url: "https://yemekhane.ktun.edu.tr/"}]]}})

  if (ctx.chat.id != 1705065791)bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);

})

bot.command('komutlar', async ctx => {

ctx.replyWithMarkdown(`Aşağıdaki komutlara tıklayarak ilgili bilgileri çağırabilirsiniz.

*/dun (dün çıkan menü)*
*/bugun (bugün çıkan menü)*
*/yarin (yarın çıkacak menü)*
*/hafta (bu hafta çıkan menü)*
*/ay (bu ay çıkan menü)*

*/rezervasyon (yemek rezervasyon sistemi)*
*/vakit (yemek vakitleri)*
*/konum (yemekhane konumu)*
*/iletisim (geliştirici iletişimi)*
`)});

bot.command('dun', async ctx => {
  bot.telegram.sendMessage(ctx.chat.id, await getYesterdayMenu(), {parse_mode: 'Markdown'}).then(function(resp) {}).catch(function(err) {});
 bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});

bot.command('bugun', async ctx => {
   bot.telegram.sendMessage(ctx.chat.id, await getTodayMenu(), {parse_mode: 'Markdown'}).then(function(resp) {}).catch(function(err) {});
  bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});

bot.command('yarin', async ctx => {
    bot.telegram.sendMessage(ctx.chat.id, await getTomorrowMenu(), {parse_mode: 'Markdown'}).then(function(resp) {}).catch(function(err) {});
   bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});

bot.command('hafta', async ctx => {
    bot.telegram.sendMessage(ctx.chat.id, await getMenuOfWeek(), {parse_mode: 'Markdown'}).then(function(resp) {}).catch(function(err) {});
   bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});

bot.command('ay', async ctx => {
    bot.telegram.sendMessage(ctx.chat.id, await getMenuOfMonth(), {parse_mode: 'Markdown'}).then(function(resp) {}).catch(function(err) {});
   bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});

bot.command('rezervasyon', (ctx) => { ctx.replyWithMarkdown("Yemekhane rezervasyonunu butona 👇 tıklayarak site üzerinden gerçekleştirebilirsin",
    {reply_markup:{inline_keyboard: [[{text: "Yemek Rezervasyon Sistemi", url: "https://yemekhane.ktun.edu.tr/"}]]}})
   bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});


bot.command('vakit', (ctx) => {
  ctx.replyWithMarkdown('Yemek vakti *Öğlen: 11:30 - 14:00* arasıdır')
 bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
});


bot.command('konum', (ctx) => {
 bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
  ctx.replyWithMarkdown('*Hangi yemekhanenin konumunu öğrenmek istiyorsun*',
  {
      reply_markup:{
          inline_keyboard: [
              [{text: "Selçuk Üni. Sosyal Tesisleri (Merkezi Yemekhane)", callback_data: "SÜST"}, {text: "Kutalmışoğlu Süleymanşah Sosyal Tesisleri", callback_data: "KSST"}]
          ]
      }
  })
});

bot.action('SÜST', (ctx) =>{
  ctx.deleteMessage().then(function(resp) {}).catch(function(err) {});
  ctx.replyWithMarkdown("*Selçuk Üniversitesi Sosyal Tesisleri (Merkezi Yemekhane)*",
  bot.telegram.sendLocation(ctx.chat.id, 38.0250705, 32.5109261)).then(function(resp) {}).catch(function(err) {});
  }
)

bot.action('KSST', (ctx) =>{
  ctx.deleteMessage().then(function(resp) {}).catch(function(err) {});
  ctx.replyWithMarkdown("*Kutalmışoğlu Süleymanşah Sosyal Tesisleri*",
  bot.telegram.sendLocation(ctx.chat.id, 38.0178754, 32.5099072)).then(function(resp) {}).catch(function(err) {});
  }
)

bot.command('hakkinda', async (ctx) => {
bot.telegram.sendMessage(ctx.chat.id,`Proje açık kaynak olarak [GitHub](https://github.com/ahmethkablama/ktun-refectory-bot) üzerinden geliştirilmektedir. Siz de projeye katılarak geliştirilmesine yardımcı olabilirsiniz.
    
Yazılım ile ilgili sorun, öneri ve görüşlerinizi @ahmethkablama 'ya iletebilirsiniz. 

[LinkedIn](https://www.linkedin.com/in/ahmethkablama/) | [Instagram](https://www.instagram.com/ahmethkablama/) | [Web](http://ahmethkablama.com/)`, {parse_mode: 'Markdown' , disable_web_page_preview: true});
bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`🆔 ${ctx.chat.id}\n👤 @${ctx.chat.username || '-'}\n😊 ${ctx.from.first_name || '-'} ${ctx.from.last_name || '-'}\n💬 ${ctx.message.text || '-'}`);
//bot.telegram.sendMessage(process.env.TELEGRAM_YOUR_ID,`Tarih: ${dayjs().format('🕗 HH:mm:ss 🗓️ DD MMMM')}\nSohbet/Mesaj: ${ctx.chat.id} / ${ctx.message.chat.id}\nKullanıcı: @${ctx.chat.username || 'kullanı adı yok'}\nAd Soyad: ${ctx.from.first_name} ${ctx.from.last_name}\nMesaj: ${ctx.message.text || 'yazı yok'}`);
});

bot.launch();

}

async function runBot() {  
  await setMenuOfMonth();
  getMenuNightJob.start();
  getMenuNotificationJob.start();
  startBot();
  }

runBot();

