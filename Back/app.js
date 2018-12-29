const express = require('express');
const app = express();




app.listen(3300, 'localhost', ()=>{
    console.log(`Server is listening on http://localhost:3300`);
});