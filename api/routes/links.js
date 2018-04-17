const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Link = require('../models/link')

router.get("/", (req, res, next) => {
    Link.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,  
            name: doc.name,
            link: doc.link
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

router.post("/", (req, res, next) => { //create new link
    const link = new Link({
    _id: new mongoose.Types.ObjectId(),    
    name: req.body.name,
    link: req.body.link
  });
  link
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added new link",
        createdLink: {
            name: result.name,
            link: result.link
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

router.delete('/:linkId', (req, res, next) => { //delete link
    Link.remove({_id: req.params.linkId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'link deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch("/:linkId", (req, res, next) => { //update link
    const id = req.params.linkId;
    if (!Link.find(id)) {
        return res.status(401).json({
            message: 'no such link'
        });
    }
    else {    
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Link.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Link updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            message: 'no link found'
        });
        });
    }
  });

module.exports=router;