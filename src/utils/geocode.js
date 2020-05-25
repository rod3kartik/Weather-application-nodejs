const request = require('request')
const geocode = (address,callback) =>{
    const geocodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1Ijoicm9kZS1rYXJ0aWsiLCJhIjoiY2thZnRwZHA3MDAxajJ3bGIzMW5nam1wOCJ9.t6nDGY60wQGBQSAQdAFNtw&limit=1'
    request({ url:geocodeurl,json:true},(error,{body})=>{
        if(error){
            callback('Cannot connect to the internet')
        }
        else if(body.features.length ===0){
            callback('Cannot find. Please improve your search')
        }
    
   else{
    callback(undefined,{
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
    })
   }
})
}
module.exports = geocode