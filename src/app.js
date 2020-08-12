const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")
const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")
const port=process.env.PORT || 3005
// console.log(__dirname)
// console.log(path.join(__dirname, "../public"))

//define paths for express config
const directoryName = path.join(__dirname, "../public")
const viewDir = path.join(__dirname, "../templates/views")
const partials = path.join(__dirname, "../templates/partials")

//define handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewDir)
hbs.registerPartials(partials)

//setup statci directory to serve
app.use(express.static(directoryName))

//rendering app
app.get("", (req, res) => {
    // res.send("<h1>Express</h1>")
    res.render("index", {
        title: "Weather app",
        name: "Jamil"
    })
})
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Jamil"
    })

})
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Want Help?",
        name: "Jamil",
        message: "You cant get any help"
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: "You must enter an address"
        })
    }
    geocode(address, (error, { location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(location, (error, { temperature, humidity, prediction }) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            // res.send("<div><h1>I am at "+location+".</h1><p>Its " + temperature + " degree celcius and there is " + pressure + " atmospheric pressure. And " + prediction+"</p></div>")
            const weatherPredict = "Its currently " + temperature + " degree celcius with a humidity of " + humidity + "%. And prediction is " + prediction + "."
            res.send({
                location: location,
                address: address,
                forecast: weatherPredict
            })
        })

    })




})
app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Please Enter a search"
        })
    }
    res.send({
        products: []
    })
})
app.get("/help/*", (req, res) => {
    res.render("errors", {
        error: "Help Directory Not found",
        title: "404!",
        name: "Jamil"
    })
})
app.get("*", (req, res) => {
    res.render("errors", {
        error: "Page Not found",
        title: "404!",
        name: "Jamil"
    })

})

app.listen(port, () => {
    console.log("Listening to port "+port)
})