const express = require("express");
const { create } = require('express-handlebars');


const  indexRoutes = require('./routers/index');
const  productsRouter  = require('./routers/ProductsApp');
//const  errorRouter  = require('./router/error');


app = express()

const PORT= process.env.PORT || 8080

const hbs = create({
    extname: ".hbs",
    helpers: {
    }
 });

//  aca le decimos que usamos handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);

// establecemos el motor de plantillas que vamos a usar 
app.set('view engine', '.hbs');

// establecemos el directorio donde estan nuestra plantillas 
app.set('views', './views');

// establecemos la carpeta donde estan nuestro achivos publicos
app.use(express.static('public'))

// Permite recibir parámetros en formato JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
//app.use("/error", errorRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
    console.log(`Server listeting on port ${PORT}`)
});