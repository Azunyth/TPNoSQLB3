var mongoose = require('../config/db');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    firstname: "String",
    lastname: "String",
    age: "Number"
}, {collection: 'persons'});

module.exports = mongoose.model('Person', personSchema);
