const express = require("express"); //all users
const router = express.Router();
const mongoose = require("mongoose");

const Contact = require('../models/contact');

router.post("/", (req, res, next) => { //create new contact
    const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),    
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    description: req.body.description,
    address: req.body.address
  });
  contact
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Added new key contact",
        createdContact: {
            name: result.name,
            email: result.email,
            phoneNumber: result.phoneNumber, 
            role: result.role,
            description: result.description, 
            address: result.address
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


router.get("/", (req, res, next) => { //get info about all modules
    Contact.find()
      .select("name email phoneNumber role description address")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          contacts: docs.map(doc => {
            return {
              name: doc.name,
              email: doc.email,
              phoneNumber: doc.phoneNumber,
              role: doc.role,
              _id: doc._id,
              description: doc.description,
              address: doc.address
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

  router.delete('/:contactId', (req, res, next) => { //delete contact
    Contact.remove({_id: req.params.contactId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'contact deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch("/:contactId", (req, res, next) => { //update a contact
    const id = req.params.contactId;
    //Contact.find(id);
    if (!Contact.find(id)) {
        return res.status(401).json({
            message: 'no such user'
        });
    }
    else {    
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Contact.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Contact updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
            message: 'no contact found'
        });
        });
    }
  });

module.exports=router;