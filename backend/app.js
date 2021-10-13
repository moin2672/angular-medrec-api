const express = require('express');

const app = express();

//middleware
// app.use((req, res, next)=>{
//     console.log('First Middleware')
//     next()
// });

app.use('/api/subjects',(req, res, next)=>{
    const subjects=[{subjectAadhar:"title", subjectName: "content"},{subjectAadhar:"title", subjectName: "content"},{title:"title", content: "content"}];
    res.status(200).json({message:"Subjects fetched successfully", subjects:subjects});
});

app.use((req, res, next)=>{
    res.send('Hello From Express')
});

module.exports = app;