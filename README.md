# COVID-19 in Zimbabwe
covid19zim Dashboard is a web application for accessing near-real time statistics and information about the COVID-19 in Zimbabwe.
Official statistics are gathered from the Ministry of Health and Child Care (MoHCC) in Zimbabwe. Other data sources such as WHO are also 
considered. This application is independently developed and not affiliated with any government organisation.

Online version available at https://covid19zim.herokuapp.com/

![Alt text](./public/images/tsr.png?raw=true "covid19zim Application")

## User Stories
covid19zim Dashboard has 3 main use cases:

- Confirm official cases, deaths and recoveries.

- Display contact details for the MoHCC in Zimbabwe

- Display Health Tips

## Documentation
- n/a



## Installation (Development Environment)
In order to run covid19zim Dashboard, an environment with the following is required:

- Node.js
- Express Framework
- Bootstrap

1. Install node dependencies.
```
$npm install
```
   
2. Start the web server (Express) and navigate to http://localhost:3000/ in your browser.
```
$npm run dev
```


## Production Deployment
1. To deploy to a production server there is no need to first bundle and uglify then deploy
```
$npm run start
```

## Supported Browsers

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| Supported| Supported| Supported| Supported| Supported| Supported
