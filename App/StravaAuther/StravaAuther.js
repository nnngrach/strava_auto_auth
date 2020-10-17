const axios = require('axios')
const storage = require( './Storage' )
const stravaAuther = require( './WebScraper' )
const cookieParser = require( './CookieParser' )
const accounts = require( './Accounts' )

const AUTH_PARAMS_KEY = 'AUTH_PARAMS_KEY'

let isScraperIdle = true;

async function getStravaTileUrl(z=13, x=4953, y=2546, mode='all', color='hot') {
    let url = ''
    if (z <= 12) {
        url = createDirectURL(z, x, y, mode, color)
    } else {
        let authParams = ''
        let storedAuthParamsObject = storage.load(AUTH_PARAMS_KEY)
        if ( !storedAuthParamsObject.isError ) {
            const isOutdated = await isAuthParamsOutdated( defaultUrlForPinging( storedAuthParamsObject.data ) )
            if ( !isOutdated ) {
                authParams = storedAuthParamsObject.data
            } else {
                authParams = await updateAuthParams()
            }
        } else {
            authParams = await updateAuthParams()
        }
        url = createURLWithAuthParams(z, x, y, mode, color, authParams)
    }
    return url
}

async function isAuthParamsOutdated(testHiResTileURL) {
    const options = {
        headers: {
            'User-Agent': 'PostmanRuntime/7.26.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection' : 'keep-alive'
        }
    }
    return await axios
        .head(testHiResTileURL, options)
        .then(function (response) {
            return response.status != 200
        })
        .catch(function (error) {
            console.log('Pinging error - ', testHiResTileURL, error)
            return true;
        })
}

async function updateAuthParams() {
    const login = accounts.getRandomAccount()
    const password = accounts.getPass()

    if (isScraperIdle) {
        isScraperIdle = false
        const authedCookies = await stravaAuther.getCookies( login, password)
        let newAuthParams = cookieParser.parse( authedCookies )
        storage.save(AUTH_PARAMS_KEY, newAuthParams)
        isScraperIdle = true
        return newAuthParams
    }
}

function createDirectURL(z, x, y, mode, color) {
    return `https://heatmap-external-a.strava.com/tiles/${mode}/${color}/${z}/${x}/${y}.png?px=512`
}

function createURLWithAuthParams(z, x, y, mode, color, authParams) {
    return `https://heatmap-external-a.strava.com/tiles-auth/${mode}/${color}/${z}/${x}/${y}.png?px=512${authParams}`
}

function defaultUrlForPinging(authParams) {
    return createURLWithAuthParams(13, 4953, 2546, 'all', 'hot', authParams)
}


module.exports.getStravaTileUrl = getStravaTileUrl