<p align="center">
  <a href="https://github.com/ahmethkablama/ktun-refectory-bot/blob/main/README.tr.md">Türkçe</a> |
  <a href="https://github.com/ahmethkablama/ktun-refectory-bot/blob/main/README.md">İngilizce</a>
</p>

# Konya Teknik Üniversitesi Yemekhane Botu 

Konya Teknik Üniversitesi yemekhanesi sistemi üzerinden alınan verilerle günlük, haftalık ve aylık olarak yayınlayabilir, kişilere veya gruplara bildirim gönderebilirsiniz.

KTÜN YEMEKHANE BOTU| 
-----------------------| 
[![@ktunyemekhanebot](https://img.shields.io/badge/%F0%9F%92%AC%20Telegram-%40ktunyemekhanebot-red)](https://telegram.me/ktunyemekhanebot)|


## Bot Komutları
Komut                   | Açıklama
----------------------- | ----------------------------------------    
`/start`                | Botu başlatır
`/dun`                  | Dünün yemek menüsü
`/bugun`                | Bugünün yemek menüsü
`/yarin`                | Yarının yemek menüsü
`/hafta`                | Haftanın yemek menüsü
`/ay`                   | Ayın yemek menüsü
`/komutlar`             | Bot komutları
`/hakkinda`             | Proje GitHub bağlantısı ve geliştirici iletişimi


<p align="center">
    <img src="https://github.com/ahmethkablama/ktun-refectory-bot/assets/29388602/e633e8a8-da3e-4c8d-bcbc-bf60e524dc9b" width="350" hspace="20" >
    <img src="https://github.com/ahmethkablama/ktun-refectory-bot/assets/29388602/cd7e5885-a30b-4d45-b165-48c24303e1e7" width="350" hspace="20" >
</p>

<p align="center">
    <img src="https://github.com/ahmethkablama/ktun-refectory-bot/assets/29388602/c7463da7-216b-4d40-b80f-77844525559f" width="350" hspace="20" >
    <img src="https://github.com/ahmethkablama/ktun-refectory-bot/assets/29388602/27d02135-e563-4c13-aedb-8364a608aa5c" width="350" hspace="20" >
</p>


## Hazırlık
1. Resmi Telegram botu [@BotFather](https://telegram.me/BotFather) aracılığı ile bot oluştur ve API TOKEN'i alın
2. Grup adıyla gönderilen ve kendinize ait bir mesajı [@userinfobot](https://telegram.me/userinfobot) botuna gönderin ve ID leri kopyalayın
3. Oluşturduğunuz bota gidin, "Başlat" butonuna tıklayın ve botunuzu grubunuza ekleyip yöneticilik verin


## Yerelde Çalıştırma

> Not: Bu adım "Visual Studio Code" ile birlikte yapılmıştır.

1. Repoyu `https://github.com/ahmethkablama/ktun-refectory-bot` klonlayın veya indirip açın
* Klonlama için aşağıdaki komutu kullanabilirsiniz
  ```bash
  git clone https://github.com/ahmethkablama/ktun-refectory-bot
  ```
2. terminalden `npm` kurulumunu gerçekleştirin
   ```bash
   npm install
   ```
3. `.env-example` dosyasına göre `.env` dosyasını oluşturun
4. `.env` dosyasının içinde bulunan `YOUR_API`, `YOUR_ID` ve `GROUP_ID` kısımlarını [@BotFather](https://telegram.me/BotFather) ve [@userinfobot](https://telegram.me/userinfobot) botlarında bulunan API ve ID lere göre doldurun
5. terminalden `npm` kurulumunu gerçekleştirin
6. `npm run start` veya `node bot.js` komutuyla çalıştırın


## Sunucuda Çalıştırma (Cpanel)

> Not: Bu adım ayrılmış bir IP adresine veya bir alan adına bağlı sunucuya (hostinge) ihtiyacınız vardır.

1. Repoyu `https://github.com/ahmethkablama/ktun-refectory-bot` indirin
2. Sunucunuzun ana dizinine botunuzun adıyla boş bir klasör oluşturun
3. Oluşturduğunuz klasöre bot dosyalarını yükleyin
4. `.env-example` dosyasına göre `.env` dosyasını oluşturun
5. `.env` dosyasının içinde bulunan `YOUR_API`, `YOUR_ID` ve `GROUP_ID` kısımlarını [@BotFather](https://telegram.me/BotFather) ve [@userinfobot](https://telegram.me/userinfobot) botlarında bulunan API ve ID lere göre doldurun
6. Sunucu panelinizden (Cpanel olarak tarif edilmektedir) `Setup Node.js App` sekmesine gidin
7. `CREATE APPLİCATİON` butonuna tıklayarak yeni bir uygulama oluşturma adımına gidin
8. Uygun Node.js versiyonunu ve modunu seçin. Botunuzun dosya yolunu ve başlangıç dosyasını (`bot.js` olarak belirlenmiştir) yazın
9. `Run NPM Install` komutuyla NPM kurulumunu yapın ve `Run JS script` komutuyla botunuzu çalıştırın


## CronJob ile Botu Yeniden Çalıştırılması

> Not: Bu adım sunucu üzerinde çalışan buton yazılım ve sunucu hatalarından dolayı devre dışı kalması durumunda botu yeniden çalıştırması içindir.

1. Ücretsiz bir servis olan [@Cron-Job](https://cron-job.org/en/) sitesine gidip üyelik işlemlerini tamamlayın.
2. İlgili menüden `Cronjobs` sayfasına gidin ve `CREAT CRONJOB` butonuna tıklayın
3. Açılan sayfada `Title` kısmına botunuzun isminizi yazabilirsiniz.
4. `URL` bölümünde `http://SİTENİZ.com/BOTUNUZUN_SUNUCU_YOLU/BOTUNUZUN_ADI.js` kendinize göre doldurun. (SİTENİZ yazan kısmı alan adı veya IP adresinizle doldurun)
5. `Execution schedule` bölümünde kendi istediğiniz ettiğiniz zaman sıklığını girin
6. Üstteki `ADVANCED` bölümünden `Treat redirects with HTTP 3xx status code as success` tikini işaretleyin
7. `SAVE` butonuna tıklayarak ve yaptığınız ayarları kaydedin.

> Not: Cron Job her çalıştığında `Cronjob execution: Failed (timeout)` hatası verecektir. Buna aldırmayın, botunuz istediğiniz zamanlarda otomatik olarak çalışacaktır.

## Kullanılan Kütüphaneler

* [Nodejs](https://nodejs.org/en/)
* [Telegraf Package](https://www.npmjs.com/package/telegraf)
* [Axios Package](https://www.npmjs.com/package/axios)
* [Cheerio Package](https://www.npmjs.com/package/cheerio)
* [Cron Package](https://www.npmjs.com/package/cron)
* [Throttler Package](https://www.npmjs.com/package/telegraf-throttler)
* [Dayjs Package](https://www.npmjs.com/package/dayjs)
