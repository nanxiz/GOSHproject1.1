const express = require("express"); //all users
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/login', (req, res, next) => { //login process
    //const Id = req.params.userId;
    User.find({ name: req.body.name })
    //User.findById(id)
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'no such user'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'auth failed'
                });
            }
            if (result) {
                const token = jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                }
            );
                return res.status(200).json({
                    message: 'auth successful',
                    id: user[0]._id
                });
            }
            res.status(401).json({
                message: 'auth failed'
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.post('/signup', (req, res, next) => { //sign up process
    User.find({ email: req.body.email })
    .exec()
    .then(user => { //check if email  taken
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'mail taken'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                       // _id: req.body.name,
                        name: req.body.name,
                        email: req.body.email,
                        department: req.body.department,
                        university: req.body.university,
                        password: hash,
                        points: 0,
                        level: "noob", 
                        quiz1: 0,
                        quiz2: 0,
                        quiz3: 0
                    });
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User created'
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                }
            });
        }
    })   
});

router.get("/", (req, res, next) => { //get info about all modules
    User.find()
      .select("name email department _id points level quizPoints")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              name: doc.name,
              email: doc.email,
              department: doc.department,
              university: doc.university,
              //productImage: doc.productImage,
              _id: doc._id,
              points: doc.points,
              level: doc.level
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

router.get("/:userId", (req, res, next) => { //get info about single user
    const id = req.params.userId;
    User.findById(id)
      .select('name email department university level points quiz1 quiz2 quiz3')
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json({
              user: doc
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

router.delete('/:userId', (req, res, next) => { //delete user
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'user deleted'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
});

router.patch("/:userId", (req, res, next) => { //update user data
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: updateOps})
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'user info question updated'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

router.get("/leaders/total", (req, res, next) => {
    User.find()
    .select("name points")
    .sort({points: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.points
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

router.get("/leaders/quiz1", (req, res, next) => {
    User.find()
    .select("name quiz1")
    .sort({quiz1: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.quiz1
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

router.get("/leaders/quiz2", (req, res, next) => {
    User.find()
    .select("name quiz2")
    .sort({quiz2: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.quiz2
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

router.get("/leaders/quiz3", (req, res, next) => {
    User.find()
    .select("name quiz3")
    .sort({quiz3: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.quiz3
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

router.post("/leaders/department", (req, res, next) => {
    User.find({department: req.body.department})
    .select("name points")
    .sort({points: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.points
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

router.post("/leaders/university", (req, res, next) => {
    User.find({university: req.body.university})
    .select("name points")
    .sort({points: -1})
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            name: doc.name,
            points: doc.points
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
module.exports=router;
