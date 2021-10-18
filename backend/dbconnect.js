const mysql =require("mysql")

const db=mysql.createConnection({
    host:process.env.host,
    port:process.env.port,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database

})

db.connect(err=>{
    if(err){
        console.log(err.message);
        return
    }
    console.log("database connected")
})

db.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
   
db.end();