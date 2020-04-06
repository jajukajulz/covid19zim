# COVID-19 in Zimbabwe
covid19zim Aggregator is a web application for accessing near-real time statistics and information about the COVID-19 in Zimbabwe.
Official statistics are gathered from the Ministry of Health and Child Care (MoHCC) in Zimbabwe. Other data sources such as WHO are also 
considered. This application is independently developed and not affiliated with any government organisation.

Online version available at https://covid19zim.site

![Alt text](./public/images/covid19zim.png?raw=true "covid19zim Aggregator")

## Use Cases
covid19zim Aggreagtor has 3 main use cases:

- Confirm official cases, deaths and recoveries.
- Display contact details for the MoHCC in Zimbabwe
- Display Health Tips
- List COVID-19 resources for Zimbabwe
- Display contact details for Hospitals in Zimbabwe

## Installation (Development Environment)
In order to run covid19zim Dashboard, an environment with the following is required:

- Node.js
- Express Framework
- Bootstrap

### Steps

1. Install node dependencies.
```
$npm install
```

2. Create a Firebase Cloud Firestore DB.
- Create a collection called `stats`
- Create a document called `stats`
- Add the following fields to the `stats` document - `const_lockdown_active`,`lockdown_status`,`lockdown_current_day`,`total_negative`,`total_recovered`,`total_tested`,`total_deaths`,`total_confirmed`,`last_updated`, `response_status_flag`,`data_date`,`lockdown_total_days`
   
3. Create .env file and add the following variables (Firebase from Firebase Service Account, smtpServer from your
 email server, and ADMIN for the user logging in via magic link).
```
FIREBASE_TYPE=
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_AUTH_URI=
FIREBASE_TOKEN_URI=
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=
FIREBASE_CLIENT_X509_CERT_URL=
smtpServerFrom=
smtpServerUser=
smtpServerPassword=
smtpServerHost= #for gmail should be smtp.gmail.com
smtpServerPort= #for gmail should be 465
ADMIN_USERNAME=
ADMIN_EMAIL=
PASSPORT_ZERO_SECRET=
NODE_ENV="development"
```

4. Start the web server (Express) and navigate to http://localhost:3000/ in your browser.
```
$npm run dev
```

5. Update Cloud Firestore and flush cache for latest stats to show on dashboard.
```
localhost:3000/caches/delete
```

## Production Deployment
1. To deploy to a production server (e.g. heroku) - create project, configure env variables and push. 

If on a different server, after deploy, run the start command.
```
$npm run start
```


## API v1 Documentation

### Get COVID19 Stats for Zim (i.e. for stats document)
```
curl -k https://covid19zim.site/api/v1/fetch_stats
{"const_lockdown_active":false,"lockdown_status":"Started","lockdown_current_day":8,"total_negative":349,"total_recovered":-1,"total_tested":358,"total_deaths":1,"total_confirmed":9,"last_updated":"06 April 2020","response_status_flag":true,"data_date":"05 April 2020","lockdown_total_days":21}
```


### Get COVID19 Stats for configured countries (i.e. for all documents)
```
curl -k https://covid19zim.site/api/v1/fetch_all_stats
{"stats":{"lockdown_total_days":21,"const_lockdown_active":false,"lockdown_status":"Started","lockdown_current_day":8,"total_negative":349,"total_recovered":-1,"total_tested":358,"total_deaths":1,"total_confirmed":9,"last_updated":"06 April 2020","response_status_flag":true,"data_date":"05 April 2020"}}
```

## Other Documentation

### Cache
The web app uses server side caching as the stats are updated once a day. The cache routes can only be access by a logged in user.
```
Check cache keys: /caches/view
Check cache json: /caches/json
Flush cache: /caches/delete
Get cache size:  /caches/size
Test cache: /caches/test/
```

### Authentication
The web app uses magic link authentication. Only the user with ADMIN_EMAIL set in env variables can login. After entering the valid login email, an email with magic link is sent, which when clicked gives access.
```
Login: /login
User Profile: /profile
Logout: /logout
```


## Supported Browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| Supported| Supported| Supported| Supported| Supported| Supported


## Get in Touch
[Feedback form](https://docs.google.com/forms/d/1mr3Kns_mwMX5brVBYgfxJKb8kO1zhaYU1p-VSV_Q5pI/)

[Blog Post about COVID19ZIM Aggregator](http://juliankanjere.com/2020/03/covid19zim-aggregator/)
