const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN');

bot.start((ctx) => ctx.reply('Welcome to Kavkaz Express Mini App'));

// Launch bot only if executed directly
if (require.main === module) {
  bot.launch().then(() => console.log('Bot started')); 
}

module.exports = bot;
