const NodeCache = require( "node-cache" )

const storingTime = 24*3600 // 24 hours in seconds
const myCache = new NodeCache( { stdTTL: storingTime, checkperiod: storingTime + 60 } )


function save(name, data) {

    const object = { isError: false, data: data}
    const isSuccess = myCache.set( name, object )
}

function load(name) {

    try{
        const object = myCache.get( name, true )
        return object

    } catch( err ){
        const errorObject = { isError: true, data: ""}
        return errorObject
    }
}


module.exports.save = save
module.exports.load = load