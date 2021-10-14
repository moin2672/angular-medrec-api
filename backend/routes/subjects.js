const express =  require('express');

const router=express.Router();

const Subject = require('../models/subject');

router.post('',(req, res, next) =>{
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
            subject: {
                ...createdSubject,
                id:createdSubject._id
            }
        });
    })
    .catch(()=>{
        console.log("Subject NOT saved")
    });
})

router.get('',(req, res, next)=>{
    
    const pageSize=+req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const subjectQuery=Subject.find();
    let fetchedSubjects;
    if(pageSize && currentPage){
        subjectQuery
            .skip(pageSize*(currentPage-1))
            .limit(pageSize)
    }
    subjectQuery
        .then(documents=>{
            fetchedSubjects=documents;
            return Subject.count();
        })
        .then(count=>{
            res.status(200).json({
                message:"Subject fetched successfully", 
                subjects:fetchedSubjects,
                maxSubjects:count
            });
        })
        .catch(()=>{console.log("Unable to get documents")});
});

router.delete('/:id',(req, res, next)=>{
    Subject.deleteOne({_id:req.params.id})
    .then(result=>{
        console.log(result);
        res.status(200).json({message:"Subject Deleted!"})
    })
    .catch(()=>{
        console.log("Subject is not deleted")
    })
});

router.put("/:id",(req, res, next)=>{
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

router.get('/:id',(req, res, next)=>{
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

module.exports=router;