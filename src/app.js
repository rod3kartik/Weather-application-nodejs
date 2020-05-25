const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirectoryPath))
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather',
        name:'Kartik Rode'
    })
    
})
app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About me',
        name:'Kartik Rode'
    })
    
})
app.get('/help',(req,res) =>{
    res.render('help',{
        title:"Help page",
        message:"This application lets you know about the weather of any desired location",
        name:"Kartik Rode"
    })
    
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search tag"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide an address"
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location} ={}) =>{
        if(error){
            return res.send({error})
        }
    
        forecast(longitude,latitude,(error,forecastdata) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                forecast:forecastdata,
                location:location
            })
        })
    }
    )
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"Error page",
        name:"Kartik Rode",
        errormessage:"No help page found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"Error page",
        name:"Kartik Rode",
        errormessage:"Page not found"
    })
})
app.listen(port, ()=>{
    console.log('Server is up on port on' + port)
})
