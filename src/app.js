const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const request = require('request')

const app = express()  
const port = process.env.PORT || 3000    //for heroku

//define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')

//setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sumit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Sumit'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'help',
        name : 'Sumit',
        helpText: 'This is some helpful text!'
    })
})
// app.get('/help',(req,res) => {
//     res.send([{
//         name : 'Sumit'
//     },{
//         name : 'Rupal'
//     }])
// })
//app.com
//app.com/help
//app.com/about
// app.get('/about',(req,res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/Weather',(req,res) => {
    if(!req.query.address)
    return res.send({
        error : 'Please Provide an address!'
    })

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
          return res.send({
              error : error
          })
        }
        forecast(latitude,longitude, (error, forecastData) => {
          if(error){
            return res.send({
                error : error
            })
          }
          res.send({
              location:location,
              forecast : forecastData,
              address : req.query.address
          })
        })
      })

})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Sumit',
        errorMessage: 'Help article not found!'
    })
})
// query check by server
// app.get('/products',(req,res) => {
//     if(!req.query.search){
//         return res.send({
//             products : 'You must provide a search term!'
//         })
//     }
//     res.send({
//         products : 'You must provide a search term!'
//     })
// })

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        name : 'Sumit',
        errorMessage : '404 Page Not Found!'
    })
})

//query 



app.listen(port, () => {
    console.log('Server is up on port '+port)
})