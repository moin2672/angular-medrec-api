const mongoose = require('mongoose');

const subjectSchema =  mongoose.Schema({
    subjectAadhar: {type:String, required: true},
    subjectName: {type:String, required:true}
});

module.exports = mongoose.model('Subject', subjectSchema);