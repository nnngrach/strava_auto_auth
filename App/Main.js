const express = require( 'express' )
const rateLimit = require('express-rate-limit')
const stravaAuther = require( './StravaAuther/StravaAuther' )


// Запуск сервера
const PORT = process.env.PORT || 4000
const app = express()


// Ограничить количество одновременных подключений до 1 в минуту
// чтобы не запустилось сразу несколько Chrome, которые забьют всю память
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1 
})
 
app.use(limiter);



app.listen( PORT, () => {
  console.log( 'Listening on port ', PORT )
})


app.get( '/', async ( req, res, next ) => {
  res.writeHead( 200, {'Content-Type': 'text/plain'})
  res.end( 'AnyGIS auto authorization script for Strava Hetatmap' )
})


// Пройти авторизацию на Strava и получить cookie
app.get( '/StravaAuth/:login/:password/', async ( req, res, next ) => {	

  const login = req.params.login
  const password = req.params.password
  if ( !login ) return next( error( 400, 'No login paramerer' ) )
  if ( !password ) return next( error( 400, 'No password paramerer' ) )

  const authedCookies = await stravaAuther.getCookies( login, password)
  res.json(authedCookies);
})


// Вспомогательные функции

function isInt( value ) {
  var x = parseFloat( value )
  return !isNaN( value ) && ( x | 0 ) === x
}


function error( status, msg ) {
  var err = new Error( msg )
  err.status = status
  return err
}
