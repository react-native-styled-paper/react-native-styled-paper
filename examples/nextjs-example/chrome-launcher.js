const ChromeLauncher = require('chrome-launcher');
 
ChromeLauncher.launch({
    startingUrl: 'https://google.com',
    port: 9222,
    chromeFlags: ['--disable-gpu'],
}).then(chrome => {
    console.log(`Chrome debugging port running on ${chrome.port}`);
}).catch(error => {
    console.log(error);
})

