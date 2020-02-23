const log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const music = require('./music.js');
const options = require('./options.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const rl = require('readline-sync');
puppeteer.use(StealthPlugin());

logger.info('start');

rl.setDefaultOptions({
	history: false
});

main();

async function main(pw) {
	var artistNumber = 0;
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
			await page.waitFor(3000);

			await addSong(page, 1);
			await addSong(page, 2);
			await addSong(page, 3);
			await addSong(page, 4);
			await addSong(page, 5);

			console.log('Artist Number:', artistNumber);
			await addNextArtist(page, artistNumber++);
		});

		await page.waitFor('._69de');
		browser.headless = true;

		await page.goto(`https://musi.sh/search/catalog/${music.list[artistNumber++]}`, { waitUntil: 'networkidle2' });
	} catch (exception) {
		await browser.close();
	}

	async function addSong(page, songNumber) {
		try {
			await page.waitFor(500);

			const songTitle = await page.$(`#main-content > div > div._657c > div > div:nth-child(${songNumber})`);

			await songTitle.click({
				button: 'right'
			});
			await page.waitFor(500);
			await page.click('#app-root > nav.react-contextmenu.react-contextmenu--visible > div:nth-child(8)');
			await page.waitFor(500);
			await page.waitForSelector('._92f0');
			await page.waitFor(500);
			await page.click('#main-content > div._1a01 > div > div > div:nth-child(1)');
			await page.waitFor(1000);
			return await Promise.resolve();
		} catch (err) {
			console.error(`Issue finding song for ${music.list[artistNumber]}`);
			console.error('err', err);
			return await Promise.resolve();
		}
	}

	async function addNextArtist(page, i) {
		await page.waitFor('._69de');
		await page.goto(`https://musi.sh/search/catalog/${music.list[i]}`, { waitUntil: 'networkidle2' });
	}
}
