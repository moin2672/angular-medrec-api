const express =  require('express');

const SubjectController=require('../controllers/subject');

const router=express.Router();

const Subject = require('../models/subject');
const checkAuth= require("../middleware/check-auth");

router.get('',SubjectController.getSubjects);
router.get('/:id',checkAuth,SubjectController.getSubject);
router.post('',checkAuth,SubjectController.createSubject)
router.put("/:id",checkAuth,SubjectController.updateSubject);
router.delete('/:id',checkAuth,SubjectController.deleteSubject);


module.exports=router;