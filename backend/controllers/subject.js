const Subject = require('../models/subject');

exports.createSubject=(req, res, next) =>{
    // const subject=req.body;
    console.log(req.body);
    const subject=new Subject({
        subjectAadhar: req.body.subjectAadhar,
        subjectName: req.body.subjectName,
        creator:req.userData.userId
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
    .catch(error=>{
        res.status(500).json({message:'Creating a Subject failed!'})
    });
}

exports.updateSubject=(req, res, next)=>{
    const subject = new Subject({
        _id:req.body._id,
        subjectAadhar: req.body.subjectAadhar,
        subjectName: req.body.subjectName,
        creator:req.userData.userId
    })
    Subject.updateOne({_id:req.params.id,creator: req.userData.userId}, subject)
        .then(result=>{
            console.log("updateSubject")
            console.log(result)
            // if(result.modifiedCount>0)
            //if(result.acknowledged)
            if(result.matchedCount>0){
                res.status(200).json({message:"Subject updated successfully!"});
            }else{
                res.status(401).json({message:"Not Authorized"})
            }
        })
        .catch(error=>{
            res.status(500).json({message:'Updating a Subject failed!'})
        });
}

exports.getSubjects=(req, res, next)=>{
    
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
        .catch(error=>{
            res.status(500).json({message:'Fetching Subjects failed!'})
        });
}

exports.getSubject=(req, res, next)=>{
    Subject.findById(req.params.id)
        .then(subject=>{
            if(subject){
                res.status(200).json(subject)
            }else{
                res.status(404).json({message:"Subject not found"});
            }
        })
        .catch(error=>{
            res.status(500).json({message:'Fetching Subject failed!'})
        });
}

exports.deleteSubject=(req, res, next)=>{
    Subject.deleteOne({_id:req.params.id, creator: req.userData.userId})
    .then(result=>{
        // console.log("onDelete")
        // console.log(result);
        if(result.deletedCount>0){
            res.status(200).json({message:"Subject Deleted successfully!"});
        }else{
            res.status(401).json({message:"Not Authorized"})
        }
    })
    .catch(error=>{
        res.status(500).json({message:'Deleting the Subject failed!'})
    });
}