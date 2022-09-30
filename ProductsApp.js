const http = require("http")
const express = require("express");
const Contenedor = require("./Contenedor.js");
const productsLogic = new Contenedor();
const Utility = require ('./Utility');
const Product = require("./Product.js");
const { Console } = require("console");
const utilityTool = new Utility();
const product = new Product();

const PORT= process.env.PORT || 8080


app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, ()=> {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

 app.get('/products', (req, res) => {
     productsLogic.getAll().then(books => res.send(books))
 });

app.get('/productRandom', (req, res)=>{
    productsLogic.getAll().then(products => utilityTool.getRandomItem(products))
            .then(item => res.send(item))
});

app.get('/products/:id', async (req, res) => {
    const id= req.params.id
    let productFound= await productsLogic.getById(id)
    res.send(productFound)
});

//Missing to implement receive many products at the same time
app.post("/save", async (req, res) => {
    productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(id=> {
        let newProduct =  new Product(id+1, req.body.title, req.body.price, req.body.thumbnail)
        productsLogic.save(newProduct)
        res.json(newProduct)
    })
});

app.delete('/products/deleteAll',  (req, res) => {
    productsLogic.deleteAll().then(item => res.send("All products where deleted"))
}); 


app.delete('/products/delete/:id',  (req, res) => {
    const id= req.params.id
    productsLogic.deleteById(id).then(item=> res.send("Removed the product" + id))
}); 