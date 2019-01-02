const express = require('express');
const app = express();
const server = app.listen(3300, 'localhost', () => {
    console.log(`Server is listening on http://localhost:3300`);
});
const io = require('socket.io').listen(server);
const mongoose = require('mongoose');
const ProductController = require('./src/controllers/ProductController');
const bodyParser = require('body-parser');

app.get('/', function (req, res) {
    res.send('Inicio de API REST');
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./src/routes/index'));

mongoose.connect('mongodb://localhost:27017/react_products', { useNewUrlParser: true }, (err) => {
    console.log('starting...');
    if (err) {
        console.log(err);
        console.log('Error');
    } else {
        console.log('Connected to database');
    }
});

// io.on('connection', socket => {
//     console.log('SOCKET: CONNECTION');
//     socket.on('PRODUCT_CHANGES', (message) => {
//         console.log('SOCKET: PRODUCT_CHANGES', message);
//     });
// });

require('./src/controllers/ProductController').handleChanges(io);