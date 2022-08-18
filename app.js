const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const signRouts = require('./routes/index');
const homeRouts = require('./routes/home');
const adminRouts = require('./routes/admin');


const app = express();
const dburl ='mongodb+srv://ffsdGrp19:gratisagency@cluster0.bwp6h.mongodb.net/mydataBase?retryWrites=true&w=majority';
mongoose.connect(dburl)
    .then((result) =>{
        console.log("connected to database")
        app.listen(3000)})
    .catch((err) => {
        console.log(err)
    });

app.set('views', './views')
app.set('view engine','ejs');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use('/',signRouts);
app.use('/home',homeRouts);
app.use('/admin',adminRouts);

