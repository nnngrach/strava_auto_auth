const express = require( 'express' )
const rateLimit = require('express-rate-limit')
const auther = require( './StravaAuther/StravaAuther' )

// Запуск сервера
const PORT = process.env.PORT || 4000
const app = express()

// Ограничить количество одновременных подключений до 1 в минуту
// чтобы не запустилось сразу несколько Chrome, которые забьют всю память
// const limiter = rateLimit({
//   windowMs: 2 * 60 * 1000,
//   max: 1
// })
//
// app.use(limiter);



app.listen( PORT, () => {
  console.log( 'Listening on port ', PORT )
})


app.get( '/', async ( req, res, next ) => {
  res.writeHead( 200, {'Content-Type': 'text/plain'})
  res.end( 'AnyGIS auto authorization script for Strava Hetatmap' )
})

// app.get( '/TEST/', async ( req, res, next ) => {

//   res.end( 'TEST' )
// })

// Редирект на URL тайла с параметрами сессии
app.get( '/:z/:x/:y/:mode/:color', async ( req, res, next ) => {
  const z = req.params.z
  const x = req.params.x
  const y = req.params.y
  const mode = req.params.mode
  const color = req.params.color

  if ( !isInt( z )) return next( error( 400, 'Z must must be Intager' ))
  if ( !isInt( x )) return next( error( 400, 'X must must be Intager' ))
  if ( !isInt( y )) return next( error( 400, 'Y must must be Intager' ))
  if ( !mode ) return next( error( 400, 'No mode paramerer' ) )
  if ( !color ) return next( error( 400, 'No color paramerer' ) )

  let urlWithAuthParams = await auther.getStravaTileUrl(z, x, y, mode, color)
  let imageDownloadResult = await auther.getContent(urlWithAuthParams)
  makeResponseFrom(imageDownloadResult, res,next)
 // res.redirect(url)
})

app.get( '/StravaAuth/:login/:password/', async ( req, res, next ) => {
  const login = req.params.login
  const password = req.params.password
  if (!login) return next(error(400, 'No login paramerer'))
  if (!password) return next(error(400, 'No password paramerer'))

  const authedCookies = await stravaAuther.getCookies(login, password)
  res.json(authedCookies);
})


// Вспомогательные функции

function makeResponseFrom(result, res, next) {

  if (result.isError) {

    return next( error( 500, 'Error with downloading tile' ) )

  } else {

    const imageBuffer = result.data

    res.writeHead( 200, {
      'Content-Type': 'image/png',
      'Content-Length': imageBuffer.length
    })

    return res.end(imageBuffer)
  }
}

function isInt( value ) {
  var x = parseFloat( value )
  return !isNaN( value ) && ( x | 0 ) === x
}

function error( status, msg ) {
  var err = new Error( msg )
  err.status = status
  return err
}