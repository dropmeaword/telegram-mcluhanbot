const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const express = require('express')
var _ = require('lodash')
const quotes = require('./mcluhan')
const app = express()

require('dotenv').config();

let token = process.env.BOT_TOKEN
//console.log('bot token -> ' + process.env.BOT_TOKEN)
//console.log( _.sample(quotes) );

const bot = new Telegraf(token)

app.use(bot.webhookCallback('/talktomcluhan'))
bot.telegram.setWebhook('https://mcluhanbot.serverless.social/talktomcluhan')

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

bot.command('face', (ctx) => ctx.replyWithPhoto({ url: 'https://live.staticflickr.com/3475/3278349959_11202eec39_z.jpg' }))

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

bot.hears('🔍 Search', ctx => ctx.reply('I find but never search') )
bot.hears('📢 Say something profound', (ctx) => ctx.reply(_.sample(quotes)) )
bot.hears('🖋 Sign up for stuff', ctx => ctx.reply('There is nothing I can sign you up for at the moment, try again some other time.') )

// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/hi|hoi|hello/gi, (ctx) => ctx.reply('Hello human'))
bot.hears(/Martijn|Rolf|Casper|Leegte|Magda|Juha|Rana|Luis|Lianne|Richard|Marijke/gi, (ctx) => ctx.reply("I know things about " + ctx.match + " that you wouldn't believe"))


bot.on('message', (ctx) => ctx.reply("I don't understand you human"))

bot.launch()


app.get('/', (req, res) => {
    res.send('The medium is the message')
})

app.listen(3000, () => {
  console.log('mcluhan bot started on port 3000...')
})
