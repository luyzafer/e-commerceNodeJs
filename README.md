Endpoints working

Get all the products
http://localhost:8080/products

       
Get Random product
http://localhost:8080/productRandom

Get By Id
http://localhost:8080/products/50

Save a product
http://localhost:8080/save
  Body
      {
        "title": "book50",
        "price": "1.50",
        "thumbnail": "www.test50.com"
       } 

Delete All products
http://localhost:8080/products/deleteAll


Delete By Id 
http://localhost:8080/products/delete/1
