const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const requset = require('request')
const { response } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 4000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)


app.get('', (req, res) => {

    res.render('index', {
        title: 'Dark Weather API ',
        name: 'Jaivardhan Singh Sikarwar'
    })
})


app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About page',
        name: 'Jaivardhan Singh Sikarwar'
    })

})

app.get('/help', (req, res) => {

    res.render('help', {
        helpText: 'this is some helpful text',
        title: 'Help',

        name: 'Jaivardhan Singh Sikarwar'
    })

})

app.get('/help/*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: 'Help artical not found',
        name: 'Jaivardhan Singh Sikarwar'
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {                 // {} is destructure object provided if no string is passed in address
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
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
        title: 404,
        name: 'Jaivardhan Singh Sikarwar',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
})