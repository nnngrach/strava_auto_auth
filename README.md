# strava_auto_auth

Supporting script for [AnyGIS Server][00]. It need to scrapping Strava authorization cookies for loading Strava Heatmap. For browser emulation it using Headless Chrome, which deployed on Apify.com platform.

### API

To load Strava Heatmap without authorization you can send GET request to API of AnyGIS Server:


[http://anygis.herokuapp.com/Tracks_Strava_All/{x}/{y}/{z}](http://anygis.herokuapp.com/Tracks_Strava_All/681/1562/12)

[http://anygis.herokuapp.com/Tracks_Strava_Ride/{x}/{y}/{z}](http://anygis.herokuapp.com/Tracks_Strava_Ride/681/1562/12)

[http://anygis.herokuapp.com/Tracks_Strava_Run/{x}/{y}/{z}](http://anygis.herokuapp.com/Tracks_Strava_Run/681/1562/12)

[http://anygis.herokuapp.com/Tracks_Strava_Water/{x}/{y}/{z}](http://anygis.herokuapp.com/Tracks_Strava_Water/681/1562/12)

[http://anygis.herokuapp.com/Tracks_Strava_Winter/{x}/{y}/{z}](http://anygis.herokuapp.com/Tracks_Strava_Winter/681/1562/12)



[00]: https://github.com/nnngrach/AnyGIS_server