# strava_auto_auth

Supporting script for [AnyGIS Server][00]. It need to scrapping Strava authorization cookies for loading Strava Heatmap. For browser emulation it using Headless Chrome, which deployed on Apify.com platform.

### API for full way

To get Strava auth cookies you have to send POST request to my script on Apify.com:

`POST https://api.apify.com/v2/acts/nnngrach~strava-auth/run-sync?token=ATnnxbF6sE7zEZDmMbZTTppKo`

In the body of this request add a JSON with your email and password. Mime type is (application/json).

`{ "email": "your_nick@gmail.com" , "password": "Your_Password" }`


This sctipt will works about 2 minutes. After that you'll get a response message. Now you can download fetched cookie-file. To do this you have to set GET request:

`GET https://api.apify.com/v2/acts/nnngrach~strava-auth/runs/last/dataset/items?token=ATnnxbF6sE7zEZDmMbZTTppKo`


To load Strava Heatmap tile you have two ways. At first you can add this cookie to your GET request:

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256`

In another way you can parse cookie and add some values from it to your URL request. You need next values: CloudFront-Signature, CloudFront-Key-Pair-Id, CloudFront-Policy.

`GET https://heatmap-external-{abc}.strava.com/tiles-auth/all/hot/{z}/{x}/{y}.png?px=256&Signature={CloudFront-Signature}&Key-Pair-Id={CloudFront-Key-Pair-Id}&Policy={CloudFront-Policy}`


### API for fast way

But fortunately all this actions are automated and you don't need to repeat it every time, when cookies are outdated. So, for load Strava Heatmap without authorization you can just send simple GET request to API of AnyGIS Server and immediately download ready tile. You can use one of this requests:

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

[00]: https://github.com/nnngrach/AnyGIS_server