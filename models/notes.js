const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notesSchema = Schema({
    title:{type:String, required:true},
    content:{type:String,required:true},
    isCompleted:{type:Boolean,required:true,default:false}
})

module.exports = mongoose.model('notes',notesSchema);