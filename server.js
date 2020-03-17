/**
 * this is the sourcecode and live server of the McLuhan Bot, the dead media theorist
 * revived as Telegram bot for the ArtEZ Interaction Design Department in Arnhem
 *
 * bot development is coordinated by Luis but anybody can participate by adding commands
 * and bot features, it is recommended that you follow the Telegram Bot workshop with 
 * Luis if you want to take part
 */
const http = require('http');
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const express = require('express')
var _ = require('lodash')
const quotes = require('./mcluhan')
const memes = require('./memes')
const app = express()

require('dotenv').config();

// the bot needs a token, it's saved in a file called .env
// it's there so that we don't have to paste it in our source code
// that key allows you to take control over the bot, so you don't 
// want to expose it in a public file
// that's why we keep it there
let token = process.env.BOT_TOKEN
// initialize the bot
const bot = new Telegraf(token)

// setup webhooks used by Telegram to talk back to the server that is hosting the bot
app.use(bot.webhookCallback('/talktomcluhan'))
bot.telegram.setWebhook('https://telegram-mcluhanbot.glitch.me/talktomcluhan')

// ///////////////////////////////////////////////////////////////////////
// C   O    M    M    A    N    D    S
// ///////////////////////////////////////////////////////////////////////

bot.start((ctx) => {
    ctx.replyWithMarkdown(`Hello earthling, this is McLuhanBot speaking. I am a dead media theorist reincarnated as a Telegram bot for the Arnhem Interaction Design department.`)
    ctx.replyWithMarkdown(`At the moment I can only obey a few commands, for example, if you say:`)
    ctx.replyWithMarkdown(`/help I will try to help you`)
    ctx.replyWithMarkdown(`/do I will show you a menu with my bag of tricks`)
    ctx.replyWithMarkdown(`/quote I will say something extremelly smart that will bring awe and intrigue to any conversation`)
    ctx.replyWithMarkdown(`/remediate I will take your message and transform its essence into another medium`)
    ctx.replyWithMarkdown(`/face I will show you my face`)
    ctx.replyWithMarkdown(`Remember: *the medium is the message!*`)
})

bot.help((ctx) => ctx.reply('How can I help you?'))
bot.command('quote', (ctx) => ctx.reply(_.sample(quotes)) )

bot.command('meme', (ctx) => {
  let memeurl = _.sample(memes)
  ctx.replyWithPhoto({ url: memeurl }) 
})

bot.command('face', (ctx) => ctx.replyWithPhoto({ url: 'https://cdn.glitch.com/a49deb4f-6b86-409f-bce9-5e456f969cf2%2Fmcluhanbot.png?v=1584461122764' }))

bot.command('do', ({ reply }) => {
    return reply('Tricks I can do', Markup
        .keyboard([
        ['😎 Is Doeke in the lab?'],
        ['📬 Post to site'],
        ['📢 Say something profound'],
        ['🖋 Sign up for stuff']
        ])
        .oneTime()
        .resize()
        .extra()
    )
})

// ///////////////////////////////////////////////////////////////////////
// C    O    N     V    E    R    S    A    T    I    O    N
// ///////////////////////////////////////////////////////////////////////

bot.hears('🔍 Search', ctx => ctx.reply('I find but never search') )
bot.hears('📢 Say something profound', (ctx) => ctx.reply(_.sample(quotes)) )
bot.hears('🖋 Sign up for stuff', ctx => ctx.reply('There is nothing I can sign you up for at the moment, try again some other time.') )

// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/hi|hoi|hello/gi, (ctx) => ctx.reply('Hello human'))
bot.hears(/Martijn|Rolf|Casper|Leegte|Magda|Juha|Rana|Luis|Leanne|Richard|Marijke/gi, (ctx) => ctx.reply("I know things about " + ctx.match + " that you wouldn't believe"))

// when McLuhan doesn't know how to reponds to what you just said
bot.on('message', (ctx) => ctx.reply("I don't understand you human"))

// runs bot core look ( @note might not be needed when working as a web server, not sure about this )
bot.launch()


// web server implementation
app.get('/', (req, res) => {
    res.send('<h1>The medium is the message</h1>')
})

app.listen(3000, () => {
  console.log('mcluhan bot started on port 3000...')
})

/*
// the following line prevents the app from going to sleep (Glitch puts unused apps to sleep after 5 minutes)
setInterval(() => {
  console.log(`Fetching url to keep alive http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
*/