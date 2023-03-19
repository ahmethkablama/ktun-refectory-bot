<p align="center">
  <a href="https://github.com/ahmethkablama/ktun-refectory-bot/blob/main/README.tr.md">Turkish</a> |
  <a href="https://github.com/ahmethkablama/ktun-refectory-bot/blob/main/README.md">English</a>
</p>

# Konya Technical University Refectory Boat

You can publish daily, weekly and monthly, and send notifications to individuals or groups with the data received through the Konya Technical University cafeteria system.

KTUN REFECTORY BOT     | 
-----------------------| 
[![@ktunyemekhanebot](https://img.shields.io/badge/%F0%9F%92%AC%20Telegram-%40ktunyemekhanebot-red)](https://telegram.me/ktunyemekhanebot)|


## Bot Commands
Command                 | Explanation
----------------------- | ----------------------------------------    
`/start`                | Starts the bot
`/dun`                  | Yesterday's Food Menu
`/bugun`                | Today's food menu
`/yarin`                | Tomorrow's food menu
`/hafta`                | Food menu of the week
`/ay`                   | Food menu of the month
`/komutlar`             | Bot commands
`/iletisim`             | Developer communication


## Preparation
1. Create bot and get API TOKEN via official Telegram bot [@BotFather](https://telegram.me/BotFather)
2. If you are going to run the bot on yourself:
   * Send your own message to the bot [@userinfobot](https://telegram.me/userinfobot) and get your ID
   * Go to the bot you created and launch it
3. If you run the Bot on a group:
   * Send a message with the group name to the bot [@userinfobot](https://telegram.me/userinfobot) and get the ID
   * Add the bot to your group and give it admin


## Local Operation

1. Clone or download and unzip the repo `https://github.com/ahmethkablama/ktun-refectory-bot`
* You can use the following command for cloning
```bash
git clone https://github.com/ahmethkablama/ktun-refectory-bot
```
2. install `npm` from terminal
```bash
npm install
```
3. Create `.env` file based on `.env.example` file
4. Fill in the `YOUR_API_TOKEN` and `YOUR_ID` sections in the `.env` file according to you
5. install `npm` from terminal
6. Run it with the command `npm run start` or `node bot.js`

## Running on Server (Cpanel)

1. Download the repo `https://github.com/ahmethkablama/ktun-refectory-bot`
2. Create an empty folder with your bot's name in your server's home directory
3. Upload bot files to the folder you created
4. Create `.env` file based on `.env-example` file
5. Fill in the `YOUR_API_TOKEN` and `YOUR_ID` sections in the `.env` file according to your own
6. From your server panel (described as Cpanel) go to the `Setup Node.js App` tab
7. Go to the step of creating a new application by clicking the `CREATE APPLICATION` button
8. Select the appropriate Node.js version and mode. Type your bot's path and startup file (designated as `bot.js`)
9. Install NPM with `Run NPM Install` command and run your bot with `Run JS script` command


## Libraries Used

* [Nodejs](https://nodejs.org/en/)
* [Telegraf Package](https://www.npmjs.com/package/telegraf)
* [Axios Package](https://www.npmjs.com/package/axios)
* [Cheerio Package](https://www.npmjs.com/package/cheerio)
* [Cron Package](https://www.npmjs.com/package/cron)
* [Dayjs Package](https://www.npmjs.com/package/dayjs)
* [Throttler Package](https://www.npmjs.com/package/telegraf-throttler)