const Product = require('../models/Product');
const io = require('../../app');

const handleChanges = (io) => {
    io.on('connection', socket => {
        socket.on('PRODUCT_CHANGES', () => {
            Product.find({}).exec((err, data) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                io.sockets.emit('NEW_CHANGES', data);
            });
        });
    });
}


const getProducts = (req, res) => {
    try {
        Product.find({}).exec((err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            return res.json(data);
        });
    } catch (error) {
        console.log(error);
    }
}

const addProduct = (req, res) => {
    try {
        Product.create(req.body, (req, data) => {
            return res.json(data);
        });
    } catch (error) {
        console.log(error);
    }
}

const modifyProduct = (req, res) => {
    try {
        let conditions = { _id: req.body._id };
        let update = req.body.product;
        Product.updateOne(conditions, update, {multi: false}, (err, data) =>{
            if (err) {
                throw err;
            }
            return res.status(200).json(data);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getProducts, addProduct, handleChanges, modifyProduct };