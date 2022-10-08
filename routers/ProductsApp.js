//const http = require("http")
const { Router} = require("express");
const router = Router();
const Contenedor = require("../Contenedor.js");
const productsLogic = new Contenedor();
const Utility = require ('../Utility');
const Product = require("../Product.js");
const utilityTool = new Utility();
const product = new Product();


const { Console } = require("console");

router.get('/list', async(req, res) => {

    const books = await productsLogic.getAll()
    res.render("listOfBooks", {
        books,
      });
});


router.get('/productRandom', async (req, res)=>{
    const books = await productsLogic.getAll()
    const bookRandom = utilityTool.getRandomItem(books)
    res.render("datos", bookRandom)
            
});

// router.get('/:id', async (req, res) => {
//     const id= req.params.id
//     let productFound= await productsLogic.getById(id)
//     res.render('datos' , productFound)
// });

//Corregir enviar a lista
router.post("/addNewBook", async (req, res) => {
    productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(id=> {
        let newProduct =  new Product(id+1, req.body.title, req.body.price, req.body.thumbnail)
        productsLogic.save(newProduct)
        res.json(newProduct)
    })
});

router.get("/addNewBook", (req, res) => {
    const formInfo={
      botonName:"Crear",
      metodo:"POST",
      url:"/api/products/addNewBook"
    }
    res.render("formTareas",formInfo);
  });
  

// router.delete('/deleteAll',  (req, res) => {
//     productsLogic.deleteAll().then(item => res.send("All products where deleted"))
// }); 


// router.delete('/delete/:id',  (req, res) => {
//     const id= req.params.id
//     productsLogic.deleteById(id).then(item=> res.send("Removed the product" + id))
// }); 

module.exports =router;