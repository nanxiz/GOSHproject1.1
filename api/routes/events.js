const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Event = require('../models/event')

router.get("/", (req, res, next) => {
    Event.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,  
            name: doc.name,
            location: doc.location,
            date: doc.date,
            startTime: doc.startTime,
            endTime: doc.endTime,
            department: doc.department
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
})

router.post("/", (req, res, next) => { //create new event
    const event = new Event({
    _id: new mongoose.Types.ObjectId(),    
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    department: req.body.department
  });
  event
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added new event",
        createdEvent: {
            name: result.name,
            location: result.location,
            date: result.date,
            startTime: result.startTime,
            endTime: result.endTime,
            department: result.department
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:eventId', (req, res, next) => { //delete event
    Event.remove({_id: req.params.eventId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'event deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch("/:eventId", (req, res, next) => { //update event
    const id = req.params.eventId;
    if (!Event.find(id)) {
        return res.status(401).json({
            message: 'no such event'
        });
    }
    else {    
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Event.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Event updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            message: 'no event found'
        });
        });
    }
  });

module.exports=router;