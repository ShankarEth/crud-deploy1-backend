const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');

let studentSchema = require('../model/StudentSchema');

router.post('/create-student',(req,res)=>{
    studentSchema.create(req.body, (error, data) => {
        if (error) {
          return next(error);
        } else {
          console.log(data);
          res.json(data);
        }
      });
})

router.get('/',(req,res)=>{
    studentSchema.find((error, data) => {
        if (error) {
          return next(error);
        } else {
          res.json(data);
        }
      });
})

router
  .route("/update-student/:id")
  // Get Single Student
  .get((req, res,next) => {
    studentSchema.findById(
      mongoose.Types.ObjectId(req.params['id']), (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  })
  
  // Update Student Data
  .put((req, res, next) => {
    // console.log(req.params['id'].substring(1));
    studentSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params['id'].substring(1)),
      {
        $set: req.body
      },
      (error, data) => {
        if (error) {
          console.log("Error occured");
          return next(error);
        } else {
          res.json(data);
          console.log("Student updated successfully !");
        }
      }
    );
  });


router.delete("/delete-student/:id", (req, res, next) => {
  studentSchema.findByIdAndRemove(
      req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = router;
