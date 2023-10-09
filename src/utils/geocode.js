const request = require('request')
const geocode = (address,callback) => {
    const url = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address)
    request({url: url,json: true},(error,{body})=>{
        if(error)
        {
            callback('Unable to connect',undefined)
        }
        else if(body.length==0)
        {
            callback('Unable to find location',undefined)
        }
        else{
            const lat = body[0].lat
            const long = body[0].lon
            callback(undefined,{
                lat: lat,
                long: long
            })
        }
        
    })
}
module.exports = geocode