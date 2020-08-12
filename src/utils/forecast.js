const request = require("request")
// const geocode = require("./geocode")
const forecast = (address, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=98670d2bcbce0a608524c4a371acf2fd&query=" + address + ""
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect", undefined)
        } else if (body.connect) {
            callback("Internal Error", {})
        } else if (body.current == undefined) {
            callback("Undefined", {})
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                pressure: body.current.pressure,
                prediction: body.current.weather_descriptions[0]

            })
        }
    })
}
module.exports = forecast