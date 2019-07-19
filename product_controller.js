 
 create =  (req, res, next) =>{
   console.log(req.app);
   const dbInstance = req.app.get('db');
   const { name, description, price, image_url } = req.body;


  dbInstance.create_product([name, description, price, image_url])
  .then(()=>{
    res.sendStatus(200)
  }).catch((error)=>{
    res.status(500).send({errorMessage: "Oops, something went wrong! A group of highly trained monkeys have been dispatched to fix the issue."}); 
    console.log(error)
  });
}

getOne = (req, res, next) =>{
  const { id } = req.params;

  const dbInstance = req.app.get('db');

  dbInstance.read_product(id)
  .then(product => res
  .status(200)
  .send(product))
  .catch((error)=>{
    res.status(500)
    .send({errorMessage: "Oops, something went wrong! A group of highly trained monkeys have been dispatched to fix the issue."}); 
    console.log(error)
  });
}

getAll = (req, res, next) =>{
 const dbInstance = req.app.get('db');


    dbInstance.read_products()
      .then(products => {
        res.status(200).send(products)
      console.log(products)})
      .catch(err => {
        res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!" });
        console.log(err)
      });
}

update = (req, res, next)=>{
  const dbInstance = req.app.get('db');
  const { params, query } = req;
 dbInstance.update_product([params.id, query.desc])
 .then(() =>{ res.sendStatus(200)})
 .catch((error)=>{
  res.status(500)
  .send({errorMessage: "Oops, something went wrong! A group of highly trained monkeys have been dispatched to fix the issue."}); 
  console.log(error)
})
}

deleteProduct = (req, res, next)=>{
  const dbInstance = req.app.get('db');
  const { id } = req.params;

dbInstance.delete_product(id)
.then(() =>{res.sendStatus(200)})
.catch((error)=>{
  res.status(500)
  .send({errorMessage: "Oops, something went wrong! A group of highly trained monkeys have been dispatched to fix the issue."}); 
  console.log(error)
})
}

module.exports={
  create,
  getOne,
  getAll,
  update,
  deleteProduct,
}