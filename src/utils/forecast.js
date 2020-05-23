const request = require('request')
const forecast = (latitude,longitude,callback) =>{
    const url='http://api.weatherstack.com/current?access_key=076c7befc2152e2815ad991171a5eb28&query='+latitude+','+longitude+'&units=f'
    // request({url:url,json:true},(error,response) =>{    without destructuring
    request({url,json:true},(error,{body}) =>{      //with destructuring
        if (error){
            callback("Unable to connect to location service",undefined)
        }else if(body.error){
            callback("Unable to find the location",undefined)
        }else{
                  const  temperature = body.current.temperature
                  const  rain = body.current.precip
                  const summary = body.current.weather_descriptions[0]
                  const city = body.location.name
                  const feelsLike = body.current.feelslike
                  const windSpeed = body.current.wind_speed
                 callback(undefined,summary+" in "+city+".It is currently "+temperature+ "(F) degrees out. Feels like "+feelsLike+" There is a "+rain+"% chance of rain.The wind speed is "+windSpeed+".")
        }
    })
}


module.exports = forecast
  