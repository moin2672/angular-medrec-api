const express = require('express');
const mogoose = require("mongoose");

const Subject = require('./models/subject');

const app = express();

mogoose.connect("mongodb+srv://shafmoin:oOdRnO3aBwTXsNCZ@cluster0.qmsyy.mongodb.net/medrec", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{console.log("Connected to Database")})
        .catch(()=>{console.log("Db connection failed!")});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//middleware
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next()
});

app.post('/api/subjects',(req, res, next) =>{
    // const subject=req.body;
    console.log(req.body);
    const subject=new Subject({
        subjectAadhar: req.body.subjectAadhar,
        subjectName: req.body.subjectName
    });
    subject.save().then(createdSubject=>{
        console.log("subject added success")
        console.log(createdSubject._id)
        res.status(201).json({
            message:"Subject added successfully!",
            subjectId: createdSubject._id
        });
    })
    .catch(()=>{
        console.log("Subject NOT saved")
    });
})

app.get('/api/subjects',(req, res, next)=>{
    Subject.find()
        .then(documents=>{
            res.status(200).json({
                message:"Subject fetched successfully", 
                subjects:documents
            });
        })
        .catch(()=>{console.log("Unable to get documents")});
});

app.delete('/api/subjects/:id',(req, res, next)=>{
    Subject.deleteOne({_id:req.params.id})
    .then(result=>{
        console.log(result);
        res.status(200).json({message:"Subject Deleted!"})
    })
    .catch(()=>{
        console.log("Subject is not deleted")
    })
});

app.put("/api/subjects/:id",(req, res, next)=>{
    const subject = new Subject({
        _id:req.body._id,
        subjectAadhar: req.body.subjectAadhar,
        subjectName: req.body.subjectName
    })
    Subject.updateOne({_id:req.params.id}, subject)
        .then(result=>{
            console.log(result)
            res.status(200).json({message:"Subject updated successfully!"});
        })
        .catch(()=>{
            console.log("Subject not updated")
        })
});

app.get('/api/subjects/:id',(req, res, next)=>{
    Subject.findById(req.params.id)
        .then(subject=>{
            if(subject){
                res.status(200).json(subject)
            }else{
                res.status(404).json({message:"Subject not found"});
            }
        })
        .catch(()=>{
            console.log("Found error in getting a subject by ID")
        })
});

app.use((req, res, next)=>{
    res.send('Hello From Express')
});

module.exports = app;