function parseCookies( cookies ) {
    let authParams = ''

    for (i in cookies) {
        if (cookies[i]["name"] == 'CloudFront-Signature') {
            authParams += '&Signature=' + cookies[i]["value"]
        }
        if (cookies[i]["name"] == 'CloudFront-Key-Pair-Id') {
            authParams += '&Key-Pair-Id=' + cookies[i]["value"]
        }
        if (cookies[i]["name"] == 'CloudFront-Policy') {
            authParams += '&Policy=' + cookies[i]["value"]
        }
    }

    return authParams
}

module.exports.parse = parseCookies