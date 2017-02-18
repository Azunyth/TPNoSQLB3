var router = require('express').Router();
var Person = require('../models/Person');
var fs = require('fs');
var helper = require('../helpers/asyncInsert');

// Permet de créer une route qui map l'url "/" en GET
router.get('/', function(req, res) {

    // Permet de retrouver des résultats sur un modèle
    Person.find({}).then(function(persons) {
        // Permet d'afficher une vue et de lui passer des paramètres
        res.render('home.ejs', { persons: persons});
    });

});

// Permet de créer une route qui map l'url "/hello" en GET
router.get('/hello', function(req, res) {
    var p = new Person({
        firstname: 'Ted',
        lastname: 'Mosby',
        age: 30
    });

    // Permet d'insérer une nouvelle donnée
    p.save().then(function(personSaved){
        res.render('hello.ejs', personSaved);
    });
});

router.get('/add', function(req, res) {
    res.render('add.ejs');
});

router.get('/loadData', function(req, res) {
    var nbPersonInsert = 0;
    var personsPromises = [];
    fs.readFile('data/persons.csv', function(err, data) {
        var dataStr = data + "";

        var allRows = dataStr.split("\n");
        for(var i = 1; i < allRows.length - 1; i++) {
            var row = allRows[i];
            var obj = row.split(',');

            var p = {
                firstname: obj[0],
                lastname: obj[1],
                gender: obj[2],
                age: obj[3],
                company: obj[4],
                departement:obj[5],
                email:obj[6],
                city:obj[7],
                country:obj[8],
                ip_address:obj[9]
            }

            personsPromises.push(helper.insertPerson(p));
        }

        Promise.all(personsPromises).then(function() {
            res.render('loaddata.ejs', { nbPersonInsert: global.nbPersonInsert});
        }).catch(function(err) {
            console.log('error : ' + err);
        });
    });
});

router.post('/add', function(req, res) {
    res.redirect('/add');
});

module.exports = router;

/*

SELECT (SELECT COUNT(*)
        FROM `table 2`
        WHERE gender = "Female"
        GROUP BY company
        HAVING company = tb.company ) * 100 / COUNT(*) as percent, company

        FROM `table 2` as tb
        GROUP BY company
        ORDER by percent DESC
        LIMIT 1

*/
