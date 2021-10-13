const express = require('express');

const app = express();

//middleware
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next()
});

app.use('/api/subjects',(req, res, next)=>{
    const subjects=[{id:"asdfasdf3w423",subjectAadhar:"title", subjectName: "content"},{id:"qwerqew798798wer",subjectAadhar:"title", subjectName: "content"},{id:"adssf7687hkh",subjectAadhar:"title", subjectName: "content"}];
    res.status(200).json({message:"Subjects fetched successfully", subjects:subjects});
});

app.use((req, res, next)=>{
    res.send('Hello From Express')
});

module.exports = app;