# AnyGIS Strava auto authorization tool

Supporting script for [AnyGIS Server][00]. It need to scrapping Strava authorization cookies for loading Strava Heatmap without authorization on hight zoom level. It can be useful for mobile navigation apps, which can't log in with Strava web site. 

For browser emulation this scrip using Headless Chrome, managed with Puppeteer Node.js library.


### API (Example of working service)

For loading Strava Heatmap without authorization you can just send simple GET request to API of AnyGIS Server and immediately download ready tile. You can use one of this requests (The script uses my personal login and password):

Hot style:

[GET https://anygis.ru/api/v1/Tracks_Strava_All/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_All/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Ride/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Ride/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Run/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Run/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Water/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Water/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Winter/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Winter/681/1562/12)


Blue-red style:

[GET https://anygis.ru/api/v1/Tracks_Strava_All_Bluered/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_All_Bluered/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Ride_Bluered/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Ride_Bluered/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Run_Bluered/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Run_Bluered/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Water_Bluered/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Water_Bluered/681/1562/12)

[GET https://anygis.ru/api/v1/Tracks_Strava_Winter_Bluered/{x}/{y}/{z}](https://anygis.ru/api/v1/Tracks_Strava_Winter_Bluered/681/1562/12)


Tiles available from 0 to 16 zoom level.



### Installation

To get RAW Strava auth cookies you can deploy this script in any hosting what you like. You can use my docker container for it:

`docker run --name anygis_strava_auto_auth --rm -p 5050:4000 -d nnngrach/anygis_strava_auto_auth`



### Fetching session cookies


Send to working container GET request with your Strava login and password. Like this:

`GET http://68.183.65.138:5050/StravaAuth/MyLogin/MyPassword`


This script can work up to 1 minute. After that you'll get a response message with JSON with all cookies data. Save them to persistent storage. And use this for loading tiles later. And when the current session expires and these cookies are no longer valid just request new cookies again.



### Loading tiles with cookies

To load Strava Heatmap tile you have two ways. At first you can add whole received JSON at cookie to your GET request for Strava Heatmap tile. Here is the URL template for this request:

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256`


### Loading tiles with HTTP parameters

In another way you can parse JSON and fetch some values from it. And add fetched values as parameters of your URL request. You need to extract next values: CloudFront-Signature, CloudFront-Key-Pair-Id, CloudFront-Policy. Here is the URL template for this request:

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256&Signature={CloudFront-Signature}&Key-Pair-Id={CloudFront-Key-Pair-Id}&Policy={CloudFront-Policy}`

[00]: https://github.com/nnngrach/AnyGIS_server