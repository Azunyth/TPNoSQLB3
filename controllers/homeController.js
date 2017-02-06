var router = require('express').Router();
var Person = require('../models/Person');

router.get('/', function(req, res) {
    Person.find({}).then(function(persons) {
        console.log(persons);
        res.render('home.ejs', { persons: persons});
    });

});

router.get('/hello', function(req, res) {
    var p = new Person({
        firstname: 'hello',
        lastname: 'tchoin',
        age: 30
    });

    p.save().then(function(personSaved){
        res.render('hello.ejs', personSaved);
    });


})

module.exports = router;
