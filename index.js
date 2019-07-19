const massive = require('massive');
const express = require('express');
require('dotenv').config();

const product_controller = require('./product_controller');

const app = express();

const { SERVER_PORT } = process.env;
const { CONNECTION_STRING } = process.env;



massive(CONNECTION_STRING).then(dbInstance =>{
  app.set('db', dbInstance);
}).catch(err => console.log(err));

app.use(express.json());

app.post('/api/products', product_controller.create);
app.get('/api/products', product_controller.getAll);
app.get('/api/products/:id', product_controller.getOne);
app.put('/api/products/:id', product_controller.update);
app.delete('/api/products/:id', product_controller.deleteProduct);

app.listen(SERVER_PORT,()=>{
  console.log(`Server listening on ${SERVER_PORT}`)
});

