const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.get('', (req,res) => {
  
    res.render('index', {
        title: "Dark Weather API",
        name: 'Jaivardhan Singh Sikarwar'
        })
    })


app.get('/about', (req,res) =>{
   
       
res.render('about', {
    title: 'About Page',
    name: 'Jaivardhan Singh Sikarwar'
    })
   
})

app.get('/help', (req,res) =>{
  
    res.render('help', {
        title: 'Help',
        message: 'This is a help page...',
      
        name: 'Jaivardhan Singh Sikarwar'
    })

})

app.get('/help/*', (req,res) =>{
    
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found...',
        name: 'Jaivardhan Singh Sikarwar'
    })

})

app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error){                 // {} is destructure object provided if no string is passed in address
                return res.send({ error }) 
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jaivardhan Singh Sikarwar',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`server is started at port ${port}`)
})