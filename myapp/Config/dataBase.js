const {createPool} =require("mysql")

const pool= createPool({
    host:'localhost',
    user:'root',
    password:'admin123',
    database:'Db'

})


module.export =pool