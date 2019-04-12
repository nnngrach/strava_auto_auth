const Apify = require('apify');

Apify.main(async () => {
   const input = await Apify.getInput();

   if (!input || !input.url) throw new Error('Invalid input, must be a JSON object with the "url" field!');

   console.log('Launching Puppeteer...');
   const browser = await Apify.launchPuppeteer();

   console.log(`Opening URL: ${input.url}`);
   const page = await browser.newPage();
   await page.goto(input.url);

   // Get the "viewport" of the page, as reported by the page.
   console.log('Determining page dimensions...');
   const dimensions = await page.evaluate(() => ({
       width: document.documentElement.clientWidth,
       height: document.documentElement.clientHeight,
       deviceScaleFactor: window.devicePixelRatio
   }));
   console.log(`Dimension: ${JSON.stringify(dimensions)}`);

   // Grab a screenshot
   console.log('Saving screenshot...');
   const screenshotBuffer = await page.screenshot();
   await Apify.setValue('screenshot.png', screenshotBuffer, { contentType: 'image/png' });

   console.log('Saving PDF snapshot...');
   const pdfBuffer = await page.pdf({ format: 'A4'});
   await Apify.setValue('page.pdf', pdfBuffer, { contentType: 'application/pdf' });

   console.log('Closing Puppeteer...');
   await browser.close();

   console.log('Done.');
   console.log('You can check the output in the key-value on the following URLs:');
   const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
   console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/screenshot.png`)
   console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/page.pdf`);
});
