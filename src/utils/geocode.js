const request = require('request')
const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VtaXRjaGF1ZGhhcnkiLCJhIjoiY2thYmJibmpuMDl4bTJ4cXlyaWN0cHJmNyJ9.EuJ1IOrnMkMCvwcZAFOYzg&limit=1'
    request({url,json:true},(error,{body})=>{  //ES6 destructuring
        if(error){
            callback('Unable to connect to loaction Services!',undefined)
        }else if(body.features.length===0){
            callback('Unable to find location.try another search!',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude :body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode