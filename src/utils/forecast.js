const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=2b68e39a927d9ef29834ad43505ef455&query=` + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to the service', undefined)
        } else if (body.error) {
            callback('unable to find the location', undefined)
        } else {
            callback(undefined, 'It is now ' + body.current.temperature + " degrees out. There is a " + body.current.precip + "% chances of rain along with " + body.current.wind_speed + "%  of wind speed")
        }
    })
}
module.exports = forecast