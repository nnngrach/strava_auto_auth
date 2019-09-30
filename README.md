# AnyGIS Strava auto authorization tool

Supporting script for [AnyGIS Server][00]. It need to scrapping Strava authorization cookies for loading Strava Heatmap without authorization on hight zoom level. It can be useful for mobile navigation apps, which can't log in with Strava web site. 

For browser emulation this scrip using Headless Chrome, managed with Puppeteer Node.js library.


### API

For loading Strava Heatmap without authorization you can just send simple GET request to API of AnyGIS Server and immediately download ready tile. You can use one of this requests(The script uses my personal login and password):

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




### About this script

To get RAW Strava auth cookies you can deploy this script in any hosthing what you like. You can use my docker container for it:

`docker run --name anygis_strava_auto_auth --rm -p 5050:4000 -d nnngrach/anygis_strava_auto_auth`


After that send to it GET request with your Strava login and password. Like this:

`GET http://68.183.65.138:5050/StravaAuth/MyLogin/MyPassword`


This script can work up to 1 minute. After that you'll get a response message with JSON with all cookies data.


To load Strava Heatmap tile you have two ways. At first you can add this json ad cookie to your GET request for heatmap tile:

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256`


In another way you can parse json and add some values from it to your URL request. You need next values: CloudFront-Signature, CloudFront-Key-Pair-Id, CloudFront-Policy.

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256&Signature={CloudFront-Signature}&Key-Pair-Id={CloudFront-Key-Pair-Id}&Policy={CloudFront-Policy}`

[00]: https://github.com/nnngrach/AnyGIS_server