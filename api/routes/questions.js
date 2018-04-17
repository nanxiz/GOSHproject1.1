const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Question = require('../models/question')

router.get("/", (req, res, next) => { //get all questions
    Question.find()
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          questions: docs.map(doc => {
            return {
              question: doc.question,
              options: doc.options,
              answer: doc.answer,
              time: doc.time,
              id: doc._id
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/:questionId", (req, res, next) => { //get single question
    const id = req.params.questionId;
    Question.findById(id)
      .select('question options answer time')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              question: doc
          });
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });

router.post('/:questionId', (req, res, next) => { //check answer
    const id = req.params.questionId;
    Question.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            if (req.body.answer == doc.answer){
                res.status(200).json({
                    message: "correct"
                });
            }
            else {
                    res.status(401).json({
                        message: "wrong answer"
                });
            }
        }
        else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID" });
          }    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
})

router.post('/', (req, res, next) => { //create new question, time set to 0
    const question = new Question({
        _id: req.body._id,
        question: req.body.question,
        options: req.body.options,
        answer: req.body.answer,
        time: 0
    });
    question
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created question successfully",
        createdQuestion: {
            _id: result._id,
            question: result.question,
            options: result.options,
            answer: result.answer,
            time: result.time
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
})

router.patch("/:questionId", (req, res, next) => { //update time
    const id = req.params.questionId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Question.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'time of question updated',
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.delete('/:questionId', (req, res, next) => { //delete question
    Question.remove({_id: req.params.questionId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'question deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

module.exports = router;