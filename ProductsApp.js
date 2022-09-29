const http = require('http')
const express = require('express');
const productsLogic = require('./Contenedor');

const PORT= process.env.PORT || 8080

app = express()

app.listen(PORT, ()=> {
    console.log(`Servidor Http escuchando en el puerto ${PORT}`)
})

app.get('/products', (req, res) => {
    productsLogic.getAll().then(books => res.send(books))
})

app.get('/productRandom', (req, res)=>{
    productsLogic.getAll().then(products => getRandomItem(products))
            .then(item => res.send(item))
})

function getRandomItem (list) {
    return list[Math.floor((Math.random()*list.length))];
  }