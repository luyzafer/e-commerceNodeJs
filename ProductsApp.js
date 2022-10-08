const http = require("http")
const express = require("express");
const Contenedor = require("./Contenedor.js");
const Utility = require ('./Utility');
const Product = require("./Product.js");
const productsLogic = new Contenedor();
const utilityTool = new Utility();
const product = new Product();
const { Router } = express;
const router = Router();
const { create } = require('express-handlebars');
const fs = require('fs');
const { Console } = require("console");

const PORT= process.env.PORT || 8080
app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', router)

const hbs = create({
})

//  aca le decimos que usamos handlebars como motor de plantilla
app.engine('handlebars', hbs.engine);

// establecemos el motor de plantillas que vamos a usar 
app.set('view engine', 'handlebars');

// establecemos el directorio donde estan nuestra plantillas 
app.set('views', './views');

// establecemos la carpeta donde estan nuestro achivos publicos
app.use(express.static('public'))


//borrar
// app.listen(PORT, ()=> {
//     console.log(`Servidor Http escuchando en el puerto ${PORT}`)
// })

fs.readFile('./views/index.handlebars', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8080);
});


router.get('/', (req, res) => {
    console.log("entre a get")
    const valores={
    products: [
        { id: 1, title: 'book1', price: '1.5', thumbnail: 'www.test1.com' },
        { id: 2, title: 'book2', price: '2.5', thumbnail: 'www.test2.com' },
        { id: 3, title: 'book2', price: '2.5', thumbnail: 'www.test2.com' },
        { id: 4, title: 'book3', price: '3.5', thumbnail: 'www.test3.com' }
    ]
    }
    productsLogic.getAll().then(books =>console.log(books))
    productsLogic.getAll().then(books => res.render('listOfBooks' , valores))
});


router.get('/productRandom', (req, res)=>{
    productsLogic.getAll().then(products => utilityTool.getRandomItem(products))
            .then(item => res.send(item))
});

router.get('/:id', async (req, res) => {
    const id= req.params.id
    let productFound= await productsLogic.getById(id)
    res.render('datos' , productFound)
});

//Missing to implement receive many products at the same time
router.post("/save", async (req, res) => {
    productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(id=> {
        let newProduct =  new Product(id+1, req.body.title, req.body.price, req.body.thumbnail)
        productsLogic.save(newProduct)
        res.json(newProduct)
    })
});

router.post("/addProduct", async (req, res) => {
    console.log("post metho")
    console.log(req.body)
   // res.render('index')
    // productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(id=> {
    //     let newProduct =  new Product(id+1, req.body.title, req.body.price, req.body.thumbnail)
    //     productsLogic.save(newProduct)
    //     res.json(newProduct)
    // })
});

router.delete('/deleteAll',  (req, res) => {
    productsLogic.deleteAll().then(item => res.send("All products where deleted"))
}); 


router.delete('/delete/:id',  (req, res) => {
    const id= req.params.id
    productsLogic.deleteById(id).then(item=> res.send("Removed the product" + id))
}); 