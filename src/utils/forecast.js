const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const forecasturl = 'http://api.weatherstack.com/current?access_key=08ad66a389606ad89c881a05a422075c&query='+ latitude +','+longitude +'' 
    request({ url:forecasturl,json:true},(error,{ body})=>{
        if(error){
            callback('Cannot connect to the internet')
        }
        else if(body.error){
            callback("Unable to find location")
        }
        else{
            callback(undefined,body.current.weather_descriptions + ". It is currently " +  body.current.temperature + ".It feels like " + body.current.feelslike);
        }
    })
    
}
module.exports = forecast