const Apify = require('apify');

Apify.main(async () => {

      const login = 'anygis0000@gmail.com';
      const pass = 'AnyG15server';

      console.log('Launching Puppeteer...');
      const browser = await Apify.launchPuppeteer();

      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 1024});
      await page.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});
      await page.waitForSelector('form');
      await page.type('input#email', login);
      await page.type('input#password', pass);
      await page.waitFor(200);
      await page.evaluate(()=>document
        .querySelector('button#login-button')
        .click()
      );
      await page.waitForNavigation();
      // await page.goto(process.env.STRAVA_CLUB_URL, {waitUntil: 'networkidle2'});
      // await page.waitFor(2000);
      console.log('Club URL loaded');

      // Give Kudos to recent club activity on page
      // await page.$$eval('button[title="Give Kudos"]', (buttons) => {
      //     buttons.map(async (button) => {
      //       console.log("kudos given");
      //       button.click();
      //     });
      // });

      await page.close();
      return 'done';



   // const input = await Apify.getInput();
   //
   // if (!input || !input.url) throw new Error('Invalid input, must be a JSON object with the "url" field!');
   //
   // console.log('Launching Puppeteer...');
   // const browser = await Apify.launchPuppeteer();
   //
   // console.log(`Opening URL: ${input.url}`);
   // const page = await browser.newPage();
   // await page.goto(input.url);
   //
   // // Get the "viewport" of the page, as reported by the page.
   // console.log('Determining page dimensions...');
   // const dimensions = await page.evaluate(() => ({
   //     width: document.documentElement.clientWidth,
   //     height: document.documentElement.clientHeight,
   //     deviceScaleFactor: window.devicePixelRatio
   // }));
   // console.log(`Dimension: ${JSON.stringify(dimensions)}`);
   //
   // // Grab a screenshot
   // console.log('Saving screenshot...');
   // const screenshotBuffer = await page.screenshot();
   // await Apify.setValue('screenshot.png', screenshotBuffer, { contentType: 'image/png' });
   //
   // console.log('Saving PDF snapshot...');
   // const pdfBuffer = await page.pdf({ format: 'A4'});
   // await Apify.setValue('page.pdf', pdfBuffer, { contentType: 'application/pdf' });
   //
   // console.log('Closing Puppeteer...');
   // await browser.close();
   //
   // console.log('Done.');
   // console.log('You can check the output in the key-value on the following URLs:');
   // const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
   // console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/screenshot.png`)
   // console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/page.pdf`);
});
