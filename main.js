const Apify = require('apify');

Apify.main(async () => {

      console.log('Extract input parameters from JSON');
      const input = await Apify.getInput();
      if (!input || !input.email || !input.password) throw new Error('Invalid input, must be a JSON object with the "email" and "password" field!');


      console.log('Launching Puppeteer');
      const browser = await Apify.launchPuppeteer();

      console.log('Authoriztion on www.strava.com/login');
      const page = await browser.newPage();
      await page.setViewport({width: 1280, height: 1024});
      await page.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});
      await page.waitForSelector('form');
      await page.type('input#email', input.email);
      await page.type('input#password', input.password);
      await page.waitFor(200);
      await page.evaluate(()=>document
        .querySelector('button#login-button')
        .click()
      );
      await page.waitForNavigation();

      console.log('Success! User URL loaded');

      // Grab a screenshot
      // console.log('Saving screenshot...');
      // const screenshotBuffer = await page.screenshot();
      // await Apify.setValue('screenshot.png', screenshotBuffer, { contentType: 'image/png' });
      // const storeId = process.env.APIFY_DEFAULT_KEY_VALUE_STORE_ID;
      // console.log(`- https://api.apify.com/v2/key-value-stores/${storeId}/records/screenshot.png`)


      console.log('Extracting cookies');










      console.log('Closing Puppeteer...');
      await page.close();
      await browser.close();

      return 'done';
      console.log('Done');

});
