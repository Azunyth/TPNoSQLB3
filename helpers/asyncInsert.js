var Person = require('../models/Person.js');

module.exports.insertPerson = function(person) {
    var newPerson = new Person(person);
    return new Promise(function(resolve, reject) {
        newPerson.save(function(err, result) {
            if (err) return reject(err);
            global.nbPersonInsert++;
            resolve(result);
        });
    });
}
