ReactApi is a simple CRUD application using React as Frontend and NodeJS as Backend.

The database used in this sample is MongoDB that just has one Schema.

```javascript
Product = new Schema({
    name: String,
    description: String,
    price: Number,
    category: String
});
```
The purpose of this application is just learn how to use React, NodeJS and MongoDB. 
Another interesting feature to learn is the use of Socket.IO to update all the clients when someone add/edit a Product.
