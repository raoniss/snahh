let mysql = require('mysql')
let con = mysql.createConnection({
    host      :'localhost',
    user      :'root',
    password  :'',
    database  :'snahh'
  })
  con.connect()
module.exports = con