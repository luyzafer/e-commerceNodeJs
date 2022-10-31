const express = require("express");
const { create } = require('express-handlebars');
const {Server: HttpServer} = require('http');
const {Server : IOServer} = require('socket.io');


const indexRoutes = require('./routers/index');
const productsRouter  = require('./routers/ProductsApp');

const productOperations = require('./appLogic.js');
const productsLogic = new productOperations();

const Utility = require('./Utility');
const Product = require("./Product.js");
const utilityTool = new Utility();




const { all } = require("./routers/index");


const PORT= process.env.PORT || 8081


app = express()

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const messages = [
	{ author: 'Juan', text: '¡Hola! ¿Qué tal?' },
	{ author: 'Pedro', text: 'Muy bien! ¿Y vos?' },
	{ author: 'Ana', text: 'Genial!' }
]

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



// app.get('/', (req, res) =>{
//     res.sendFile('index.html')
// });



// io.on('connection', clienteNuevo => {
// 	console.log('Un cliente se ha conectado');
// 	clienteNuevo.emit('messages', messages);
	
// 	clienteNuevo.on('new-message', data => {
// 		messages.push(data);
// 		io.sockets.emit('messages-push', data);
// 	})
// });

io.on('connection' , async socket =>{
	console.log("entre al socket")
	await sendAllProducts(socket)

	console.log("ya envié all producs")

	socket.on("new product", (newProduct) => {
		saveProducts(newProduct)
	})

	socket.on("new message", (newMessage) => {
		saveMessage(newMessage)
	})
})

const saveProducts = async (newProductReceived) => {

		const productsDB = await productsLogic.getAll().then(items => utilityTool.getLastId(items)).then(async id => {
			let newProduct = new Product(id + 1, newProductReceived.title, newProductReceived.price, newProductReceived.thumbnail)
			await productsLogic.save(newProduct)
		})
		const allProducts = await productsLogic.getAll()
		io.sockets.emit("all products", allProducts)
}

const sendAllProducts = async(socket) => {
	console.log("entre a sendAllProducts")
	const allProduct = await productsLogic.getAll(); 
	console.log(allProduct)

	socket.emit("all products", allProduct)

}


const saveMessage = async (newMessageReceived) => {

	messages.push(newMessageReceived)
	io.sockets.emit("all messages", messages)
}

httpServer.listen(PORT, () => {
    console.log(`Server listeting on port ${PORT}`)
});