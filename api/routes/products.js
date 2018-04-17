const express = require("express");  //will be used for all modules 
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer'); 

const storage = multer.diskStorage({ //if image upploaded it will be stored in uploads
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject image types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true); //can throw error here
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, //limitaitons on the picture
    limits: {
        filesize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const Product = require("../models/product");

router.get("/", (req, res, next) => { //get info about all modules
  Product.find()
    .select("name brief description _id productImage questions answers department")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            brief: doc.brief,
            description: doc.description,
            productImage: doc.productImage,
            _id: doc._id,
            questions: doc.questions,
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
});

router.post("/", (req, res, next) => { //create new module
    const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    brief: req.body.brief,
    description: req.body.description,
    questions: req.body.questions,
    department: req.body.department

  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            description: result.description,
            _id: result._id,
            questions: result.questions,
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


router.post("/", upload.single('productImage'), (req, res, next) => { //create new module
    console.log(req.file);
    const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    brief: req.body.brief,
    description: req.body.description,
    productImage: req.file.path,
    questions: req.body.questions,
    department: req.body.department
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
            name: result.name,
            brief: result.brief,
            description: result.description,
            _id: result._id,
            questions: result.questions, 
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

router.post('/questions', (req, res, next) => { //login process
  Product.find({ name: req.body.name })
  .exec()
  .then(doc => {
      if (doc.length < 1) {
          return res.status(401).json({
              message: 'no such module'
          });
      }
      else {
        return res.status(200).json({
            number: doc[0].questions.length,
            questions: doc[0].questions
            });
      }
      })
  .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
  });
});

router.get("/:productId", (req, res, next) => { //get info about single module
  const id = req.params.productId;
  Product.findById(id)
    .select('name description _id productImage questions department brief')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc
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

router.patch("/:productId", (req, res, next) => { //update single module
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product updated'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/department", (req, res, next) => {
  Product.find({department: req.body.department})
    .select('name description _id productImage questions department')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc
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
})

router.delete("/:productId", (req, res, next) => { //delete single module
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'Product deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;