const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const login = require('./login.js');
const video = require('./music.js/index.js');
const options = require('./options.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// @ts-ignore
puppeteer.use(StealthPlugin());
logger.info('start');

main();
async function main() {
	const browser = await puppeteer.launch({ headless: options.disableBrowserWindow });
	try {
		// @ts-ignore
		const page = await browser.newPage();
		await page.goto(video.youtubeUrl, { waitUntil: 'networkidle2' });
		await page.type('input[type="email"]', login.email);
		await page.type('body', '\u000d');
		await page.waitForNavigation();
		await page.waitFor(2000);
		await page.type('input[type="password"]', login.pass);
		await page.type('body', '\u000d');
		await page.waitForNavigation();
		await page.goto(`https://musi.sh`, { waitUntil: 'networkidle2' });
		await page.waitFor('.c2bb');
		await browser.close();
	} catch (exception) {
		await browser.close();
	}
}
