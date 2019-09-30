const puppeteer = require( 'puppeteer' )

async function getCookies( login, password) {
  const herokuDeploymentParams = {'args' : ['--no-sandbox', '--disable-setuid-sandbox']}
  const browser = await puppeteer.launch(herokuDeploymentParams)

  // Авторизация на  www.strava.com/login
  const page1 = await browser.newPage()
  await page1.setViewport({width: 1280, height: 1024})
  await page1.goto('https://www.strava.com/login', {waitUntil: 'networkidle2'})
  await page1.waitForSelector('form')
  await page1.type('input#email', login)
  await page1.type('input#password', password)
  await page1.waitFor(200)
  await page1.evaluate(()=>document
    .querySelector('button#login-button')
    .click()
  )
  await page1.waitForNavigation()

  // Извлекаем _strava4_session cookie
  const sessionFourCookie = await page1.cookies()
  //console.log(sessionFourCookie)
  //console.log("================================")

  // Авторизация на heatmap-external-a.strava.com/auth
  const page2 = await browser.newPage()
  await page2.setCookie(...sessionFourCookie)
  await page2.goto('https://heatmap-external-a.strava.com/auth')

  // Извлекаем дополненные CloudFront cookies
  const cloudfontCookie = await page2.cookies()
  //console.log(cloudfontCookie)

  await browser.close()
  return cloudfontCookie
}

module.exports.getCookies = getCookies
