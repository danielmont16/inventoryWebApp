const mongoose = require('mongoose');
const schemaObj = {
    code:{type:String, required:true},
    name:{type:String, required:true},
    quantity:{type:String, required:true},
    unit:{type:String, required:true},
    creationDate:{type:Date, required:true}
}

const mongooseSchema = mongoose.Schema(schemaObj);
module.exports = mongoose.model("Product", mongooseSchema);