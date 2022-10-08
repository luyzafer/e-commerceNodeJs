Endpoints working , Test from postman

Get all the products
http://localhost:8080/api/products/list

       
Get Random product
http://localhost:8080/api/products/productRandom

Get By Id
http://localhost:8080/api/products/50

Save a product
http://localhost:8080/api/products/addNewBook
  Body
      {
        "title": "book50",
        "price": "1.50",
        "thumbnail": "www.test50.com"
       } 
       
Update a product
http://localhost:8080/api/products/edit/2
  Body
      {
        "title": "book50",
        "price": "1.50",
        "thumbnail": "www.test50.com"
       } 

Delete All products
http://localhost:8080/api/products/deleteAll


Delete By Id 
http://localhost:8080/api/products/delete/1


Se puede ver el proyecto http://localhost:8080/
Funcionalidades trabajando en el front
- Get all books
- Save a new book
- Get a random book

Los demás métodos se encuentran en construcción
