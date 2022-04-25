const {Schema, model} = require("mongoose");

const PersonSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        match: /.+\@.+\..+/,
        unique: true
    }
},{timestamps:true});

module.exports = model('Person',PersonSchema)