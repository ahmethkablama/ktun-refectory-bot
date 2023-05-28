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

<p align="center">
    <img src="https://github.com/ahmethkablama/ktun-weather-bot/assets/29388602/831dcb62-57e1-4cb3-b3a6-a9ec8a39f344" width="350" hspace="20" >
    <img src="https://github.com/ahmethkablama/ktun-weather-bot/assets/29388602/36b66eba-4799-4fa1-9f10-6a3b35c18b9d" width="350" hspace="20" >
</p>

<p align="center">
    <img src="https://github.com/ahmethkablama/ktun-weather-bot/assets/29388602/81575f57-cd8c-4158-be76-ee8e3395d3c1" width="350" hspace="20" >
    <img src="https://github.com/ahmethkablama/ktun-weather-bot/assets/29388602/c20ea647-9cf3-43cd-98b4-f3d248095f2c" width="350" hspace="20" >
</p>


## Preparation
1. Create bot and get API TOKEN via official Telegram bot [@BotFather](https://telegram.me/BotFather)
2. Send your own message with the group name to the bot [@userinfobot](https://telegram.me/userinfobot) and copy the IDs
3. Go to the bot you created, click the "Start" button and add your bot to your group and give it admin


## Local Operation

> Note: This step was done with "Visual Studio Code".

1. Clone or download and unzip the repo `https://github.com/ahmethkablama/ktun-refectory-bot`
* You can use the following command for cloning
```bash
git clone https://github.com/ahmethkablama/ktun-refectory-bot
```
2. install `npm` from terminal
```bash
npm install
```
3. Create `.env` file based on `.env-example` file
4.Replace `YOUR_API`, `YOUR_ID` and `GROUP_ID` in the `.env` file with [@userinfobot](https://telegram.me/userinfobot) and [@userinfobot](https://telegram.me/userinfobot) Fill according to API and IDs found in bots
5. install `npm` from terminal
6. Run it with the command `npm run start` or `node bot.js`

## Running on Server (Cpanel)

> Note: This step requires a dedicated IP address or a domain-named server (hosting).

1. Download the repo `https://github.com/ahmethkablama/ktun-refectory-bot`
2.  Create an empty folder with your bot's name in your server's home directory
3. Upload bot files to the folder you created
4. Create `.env` file based on `.env-example` file
5. Replace `YOUR_API`, `YOUR_ID` and `GROUP_ID` in the `.env` file with [@userinfobot](https://telegram.me/userinfobot) and [@userinfobot](https://telegram.me/userinfobot) Fill according to API and IDs found in bots
6. From your server panel (described as Cpanel) go to the `Setup Node.js App` tab
7. Go to the step of creating a new application by clicking the `CREATE APPLICATION` button
8. Select the appropriate Node.js version and mode. Type your bot's path and startup file (designated as `bot.js`)
9. Install NPM with `Run NPM Install` command and run your bot with `Run JS script` command


## Restarting the Bot with CronJob

> Note: This step is to restart the bot in case the button running on the server is disabled due to software and server errors.

1. Go to the free service [@Cron-Job](https://cron-job.org/en/) and complete the registration process.
2. Go to the `Cronjobs` page from the relevant menu and click the `CREAT CRONJOB` button
3. On the page that opens, you can write your bot's name in the 'Title' section.
4. In the 'URL' section, fill in 'http://SİTENİZ.com/BOTuzun_SUNUCU_YOLU/BOTuzun_ADI.js' according to you. (Fill in the part that says YOUR SITE with your domain name or IP address)
5. In the `Execution schedule` section, enter the time frequency you want
6. Tick `Treat redirects with HTTP 3xx status code as success` in the `ADVANCED` section above
7. Click the `SAVE` button and save your settings.

> Note: Every time the Cron Job runs, it will throw a `Cronjob execution: Failed (timeout)` error. Don't mind this, your bot will run automatically whenever you want.

## Libraries Used

* [Nodejs](https://nodejs.org/en/)
* [Telegraf Package](https://www.npmjs.com/package/telegraf)
* [Axios Package](https://www.npmjs.com/package/axios)
* [Cheerio Package](https://www.npmjs.com/package/cheerio)
* [Cron Package](https://www.npmjs.com/package/cron)
* [Throttler Package](https://www.npmjs.com/package/telegraf-throttler)
* [Dayjs Package](https://www.npmjs.com/package/dayjs)