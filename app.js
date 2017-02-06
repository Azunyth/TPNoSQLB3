var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');

app.use('/', require('./controllers/homeController'));

app.listen(1337, function() {
    console.log('App is running on port 1337');
})
