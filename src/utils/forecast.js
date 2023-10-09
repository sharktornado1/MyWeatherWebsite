const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherapi.com/v1/forecast.json?key=2b46f0ab1e644c6aa34171936230510&q='+lat+','+long+'&days=1&aqi=no&alerts=no'
    request({url: url,json: true},(error,{body})=>{
        if(error)
        {
            callback("Unable to connect",undefined)
        }
        else if(body.error)
        {
            callback("Unable to find location",undefined)
        }
        else{
            const rainchance = body.forecast.forecastday[0].day.daily_chance_of_rain
            const temp = body.current.temp_c
            callback(undefined,body.current.condition.text+ '. It is currently '+temp+' degrees. There is a '+rainchance+'% chance to rain')
        }
    })
}
module.exports = forecast