const fs = require('fs');
const product = require('./Product.js')

class Contenedor{

    idProduct = 0;

    constructor(idProduct){
        this.idProduct=idProduct
    }

    async getAll(){
        console.log("Entering to get all the products")
        try {
            const productsReturned = await fs.promises.readFile('./productos.txt', 'utf-8')
            let productsDB = JSON.parse(productsReturned.toString()||'[]')
            return productsDB
        } catch (error) {
            throw new Error("Error reading the file: " + error.message)
        }
    }


    async save (product){
        console.log("Entering to save the new product")
        try{
            return this.getAll().then(productsDB=> {
                productsDB.push(product)
                this.writeInDB(productsDB)
                console.log("Saved in DB")
            })

        }catch(error){
            throw new Error(`Error saving the product ${product.id} : ${error.message}`)
        }
    }

    async update (product){
        console.log("Entering to update the  product" + product.id)
        try{
            const allProducts = await this.getAll()
            const elementToUpdate = allProducts.find(item=> item.id== product.id)
            if(elementToUpdate){
               const index= allProducts.indexOf(elementToUpdate)
               allProducts[index]= product
               this.writeInDB(allProducts)
            }
        }catch(error){
            throw new Error("Error updating the product: " + product.id + error.message)
        }
    }

    async getById(id){
        console.log("Entering to find the product in DB")
        try{  
            return this.getAll().then(products=> {
                let productFound = null 
                productFound = products.find(p => p.id == id)   
                return productFound == undefined ? null : productFound
            })
        }catch(error){
            throw new Error(`Error getting product with id: ${id} ${error.message}`)
        }
    }

    async writeInDB(listProducts){
        console.log("Entering to write in DB")
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify(listProducts, null, 2))
        } catch (error) {
            throw new Error(`Error writing in the file ${error.message}`)
        }
    }

    async deleteById(id){
        console.log("Entering to delete the product with id: " + id)
        try {
            this.getAll().then(products => {
            return products.filter(prod => prod.id !=id )
            }).then(async newList=> {
                this.writeInDB(newList)
                console.log(`New list of products after removing id ${id} ${JSON.stringify(newList)}`)
            })
        } catch (error) {
            throw new Error(`Error deleting product with id: ${id} ${error.message}`)
        }
    }
        
    async deleteAll(){
        try {
            let listEmpty = [] 
            this.writeInDB(listEmpty)
            console.log(`New list of products after removing all ${JSON.stringify(listEmpty)}`)
            
        } catch (error) {
            throw new Error(`Error deleting all products`)
        }
    }
}

    module.exports = Contenedor

