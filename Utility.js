class Utility{


    getLastId(productsDB){
        let lastId = 0
        productsDB.forEach(element => {
            if(element.id>lastId){
                lastId=element.id
            }
        });
        return lastId
    }

     getRandomItem (list) {
        return list[Math.floor((Math.random()*list.length))];
      }
}

module.exports = Utility