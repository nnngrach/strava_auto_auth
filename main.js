const Apify = require('apify');

Apify.main(async () => {

      console.log('Extract input parameters from JSON');
      const input = await Apify.getInput();
      if (!input || !input.email || !input.password) throw new Error('Invalid input, must be a JSON object with the "email" and "password" field!');


      console.log('Launching Puppeteer');
      const browser = await Apify.launchPuppeteer();


      console.log('Authoriztion on www.strava.com/login');
      const page1 = await browser.newPage();
      await page1.setViewport({width: 1280, height: 1024});
      await page1.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'});
      await page1.waitForSelector('form');
      await page1.type('input#email', input.email);
      await page1.type('input#password', input.password);
      await page1.waitFor(200);
      await page1.evaluate(()=>document
        .querySelector('button#login-button')
        .click()
      );
      await page1.waitForNavigation();


      console.log('Extracting _strava4_session cookie');
      const sessionFourCookie = await page1.cookies();
      //console.log(sessionFourCookie);


      console.log('Authoriztion on heatmap-external-a.strava.com/auth');
      const page2 = await browser.newPage();
      await page2.setCookie(...sessionFourCookie);
      await page2.goto('https://heatmap-external-a.strava.com/auth');


      console.log('Extracting CloudFront cookies');
      const cloudfontCookie = await page2.cookies();
      //console.log(cloudfontCookie);



      // console.log('Saving CloudFront cookies');
      // const store = await Apify.openKeyValueStore();
      // await store.setValue('cloudfontCookie', { cookie: cloudfontCookie });
      await Apify.pushData(cloudfontCookie);

      console.log('Success! Closing Puppeteer');
      await browser.close();

      return cloudfontCookie;
});
