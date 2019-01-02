const express = require('express');
const ProductController = require('../controllers/ProductController');

var router = express.Router();

router.get('/products', ProductController.getProducts);
router.post('/products/add',ProductController.addProduct);
router.post('/products/modify',ProductController.modifyProduct);

module.exports =  router;