var mongoose = require('mongoose');
var Schema = mongoose.Schema;

class User {

    Model = '';

    constructor(){

        // Use schema
        this.userSchema = new Schema({
            firstname:  String,
            lastname : String,
            username :   String,
            password :   String,
            dob: { 
                type: Date, 
                default: Date.now 
            },
            created: { type: Date, default: Date.now }
        });

        // create model
        this.Model = mongoose.model('User', this.userSchema);
    }
}

module.exports = new User();