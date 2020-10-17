const axios = require('axios')
const storage = require( './Storage' )
const stravaAuther = require( './WebScraper' )
const cookieParser = require( './CookieParser' )
const accounts = require( './Accounts' )

const AUTH_PARAMS_KEY = 'AUTH_PARAMS_KEY'

let isScraperIdle = true;

async function getStravaTileUrl(z, x, y, size, mode, color) {
    let url = ''
    if (z < 12) {
        url = createDirectURL(z, x, y, size, mode, color)
    } else {
        let authParams = ''

        let storedAuthParamsObject = storage.load(AUTH_PARAMS_KEY)
        if ( !storedAuthParamsObject.isError &&
            typeof storedAuthParamsObject.data !== 'undefined' &&
            storedAuthParamsObject.data ) {

            const defaultUrl = defaultUrlForPinging( size, storedAuthParamsObject.data )
            const isOutdated = await isAuthParamsOutdated( defaultUrl )
            if ( !isOutdated ) {
                authParams = storedAuthParamsObject.data
            } else {
                authParams = null
            }
        } else {
            authParams = null
        }

        if (!authParams) {
            let authParamsObject = await updateAuthParams()
            if (!authParamsObject.isError) {
                authParams = authParamsObject.data
            } else {
                return {isError: true, data: null}
            }
        }

        url = createURLWithAuthParams(z, x, y, size, mode, color, authParams)
    }

    return {isError: false, data: url}
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

async function getContent(url) {
    const options = {
        responseType: 'arraybuffer',
        headers: {
            'User-Agent': 'PostmanRuntime/7.26.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection' : 'keep-alive'
        }
    }
    return await axios
        .get(url, options)
        .then(function (response) {
            console.log('Download ok - ', url)
            const buffer = Buffer.from( response.data, 'base64' )
            return { isError: false, data: buffer}
        })
        .catch(function (error) {
            console.log('Download error - ', url)
            return { isError: true, data: ""}
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
        return {isError:false, data:newAuthParams}
    } else {
        return {isError:true, data:null}
    }
}

function createDirectURL(z, x, y, size, mode, color) {
    return `https://heatmap-external-a.strava.com/tiles/${mode}/${color}/${z}/${x}/${y}.png?px=${size}`
}

function createURLWithAuthParams(z, x, y, size, mode, color, authParams) {
    return `https://heatmap-external-a.strava.com/tiles-auth/${mode}/${color}/${z}/${x}/${y}.png?px=${size}${authParams}`
}

function defaultUrlForPinging(size, authParams) {
    return createURLWithAuthParams(13, 4953, 2546, size, 'all', 'hot', authParams)
}


module.exports.getStravaTileUrl = getStravaTileUrl
module.exports.getContent = getContent