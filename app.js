const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const login = require('./login.js');
const options = require('./options.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const rl = require('readline-sync');
puppeteer.use(StealthPlugin());

logger.info('start');

rl.setDefaultOptions({
	history: false
});

// var pw = rl.question(`Please enter your Apple ID pw:`, {
// 	hideEchoBack: true // The typed text on screen is hidden by `*` (default).
// });

// main(pw);
main();

async function main(pw) {
	const browser = await puppeteer.launch({ headless: options.disableBrowserWindow, devtools: false, timeout: 60000, slowMo: 250 });
	try {
		// @ts-ignore
		const page = await browser.newPage();
		await page.goto('https://musi.sh', { waitUntil: 'networkidle2' });

		await page.click('._045a');

		// debugger;

		page.on('dialog', async (dialog) => {
			console.log(dialog.message());
			await dialog.accept();
			await page.waitFor(2000);

			const songTitle = await page.$('#main-content > div > div._657c > div > div:nth-child(1)');

			//#main-content > div > div._657c > div > div:nth-child(1)
			//#main-content > div > div._657c > div > div:nth-child(2)
			//#main-content > div > div._657c > div > div:nth-child(3)
			//#main-content > div > div._657c > div > div:nth-child(4)
			//#main-content > div > div._657c > div > div:nth-child(5)

			await songTitle.click({
				button: 'right'
			});
			await page.click('#app-root > nav.react-contextmenu.react-contextmenu--visible > div:nth-child(8)');

			await page.waitForSelector('._92f0');
			await page.click('#main-content > div._1a01 > div > div > div:nth-child(1)');

			await page.waitFor(1000);
		});

		await page.waitFor('._69de');
		await page.goto('https://musi.sh/search/catalog/bassnectar', { waitUntil: 'networkidle2' });
	} catch (exception) {
		await browser.close();
	}
}
