const fs = require('fs');

class Contenedor{

    idProduct = 0;

    constructor(idProduct){
        this.idProduct=idProduct
    }

    async getAll(){
        try {
        
            const productsReturned = await fs.promises.readFile('./productos.txt', 'utf-8')
            let productsDB = JSON.parse(productsReturned)
            idProduct = getLastId(productsDB)
            return productsDB
        } catch (error) {
            throw new Error(`Error reading the file: ${error.message}`)
        }
    }

    getLastId(productsDB){
        let lastId = 0
        productsDB.forEach(element => {
            if(element.id>lastId){
                lastId=element.id
            }
        });
        return lastId
    }

    //save into the array, create an array
    async save (product){
        try{
            return getAll().then(productsDB=> {
                product.id= getNewId()
                productsDB.push(product)
                writeInDB(productsDB)
            })

        }catch(error){
            throw new Error(`Error saving the product ${product.id} : ${error.message}`)
        }
    }

    getNewId(){
        idProduct=idProduct+1
        return idProduct
    }


    async getById(id){
        try{  
            return getAll().then(products=> {
                let productFound = null 
                productFound = products.find(p => p.id == id)   
                return productFound == undefined ? null : productFound
            })
        }catch(error){
            throw new Error(`Error getting product with id: ${id} ${error.message}`)
        }
    }

    async writeInDB(listProducts){
        try {
            await fs.promises.writeFile('./productos.txt', JSON.stringify(listProducts, null, 2))
        } catch (error) {
            throw new Error(`Error writing in the file ${error.message}`)
        }
    }

    async deleteById(id){

        try {
            getAll().then(products => {
            return products.filter(prod => prod.id !=id )
            }).then(async newList=> {
                writeInDB(newList)
                console.log(`New list of products after removing id ${id} ${JSON.stringify(newList)}`)
            })
        } catch (error) {
            throw new Error(`Error deleting product with id: ${id} ${error.message}`)
        }
    }
        
    async deleteAll(){
        try {
            let listEmpty = [] 
            writeInDB(listEmpty)
            console.log(`New list of products after removing all ${JSON.stringify(listEmpty)}`)
            
        } catch (error) {
            throw new Error(`Error deleting all products`)
        }
    }

    // class Product {
    //     id
    //     title
    //     price
    //     thumbnail

    //     constructor(id,title, price, thumbnail) { 
    //     this.id = id
    //     this.title = title
    //     this.price = price
    //     this.thumbnail = thumbnail
    //     }
        
    // }
}



//**********************TESTING --> Remove the docummented mark for the method you wanna test **********************


//Save books in the DB
    //  save(new Product(0,'book1', '1.5', 'www.test1.com'))
    //  .then(item=> save(new Product(0,'book2', '2.5', 'www.test2.com')))
    //  .then(item=>save(new Product(0,'book2', '2.5', 'www.test2.com')))
    //  .then(item=>save(new Product(0,'book3', '3.5', 'www.test3.com')))
    //  .then(item=>save(new Product(0,'book4', '4.5', 'www.test4.com')))
    //  .then(item=>save(new Product(0,'book5', '5.5', 'www.test5.com')))
    //  .then(item=>save(new Product(0,'book6', '6.5', 'www.test6.com')))
    //  .then(item=>save(new Product(0,'book7', '7.5', 'www.test7.com')))
    //  .then(item=>save(new Product(0,'book8', '8.5', 'www.test8.com')))
    //  .then(item=>save(new Product(0,'book9', '9.5', 'www.test9.com')))
    //  .then(item=>save(new Product(0,'book10', '10.5', 'www.test10.com')))

//Get all the books from the DB
    // getAll().then(result=> {
    //     if(result.length==0)
    //              console.log(`There are not books in the database `)
    //         else
    //              console.log(result)
    // })
    

//Get by id ==> id 2 exist
    //getById(2).then(value => console.log('Product found ' + JSON.stringify(value)))

//Get by id ==> id 100 doesn't exist
    //getById(100).then(value => console.log('Product found ' + value))

//Delete by id ==> id 1 exist
    //deleteById(1)

//Delete by id ==> id 100 doesn't exist
    //deleteById(100)

//Delete all the books in the DB
    //deleteAll()