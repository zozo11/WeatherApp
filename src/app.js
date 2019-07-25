const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const geoadr = require('./geocode.js');
const forecase = require('./forecase.js');
const port = process.env.PORT || 3000;

//define the path for Express js config
const publicSrc = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views folder location 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
//setup a static dirctory to server using static html file 
app.use(express.static(publicSrc));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Zoe'
    })
});
app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Zoe'
    })
});
app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help',
      name: 'Zoe'
    })
});
app.get('/weather', (req, res) => {
    if(!req.query.address){//query + customer json key name
        return res.send({
            error : 'Must have address'
        })
    }
    geoadr(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if(error){
            return res.send({error});
        }else{
            forecase(latitude, longtitude, (error, forcasedata) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    location : location,
                    forcasedata : forcasedata,
                    address : req.query.address
                })
            })
        }
    })


});
app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        res.send({
            error : 'Must have a search term'
        }) 
    }
    res.send({
        product : []
    })
});
app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Zoe',
        errorMasseage: 'Article not found'
    })
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zoe',
        errorMasseage: 'Page Not Found!!'
    })
});
app.listen(port, () => {
    console.log( port + ' is listen')
})  