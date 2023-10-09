const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views locations
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup Static directory
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karteke'
    })
})
app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About page',
        name: 'Karteke'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        help: 'This is the help page',
        title: 'Help',
        name: 'Karteke'
    })
})


app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error,{lat,long} = {}) => {
        if(error)
        {
            return res.send({
                error
            })
        }
        else{
            forecast(lat,long,(error,weatherdata) =>{
                if(error)
                {
                    return res.send({
                        error
                    })
                }
                res.send({
                    address: req.query.address,
                    forecast: weatherdata
                })
            })
        }
        
    })
    
})
app.get('/products',(req,res) => {
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'Error: 404',
        errorMsg: 'Error, Help article not found',
        name: 'Karteke'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: 'Error: 404',
        errorMsg: 'Error 404 Page not found',
        name: 'Karteke'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
