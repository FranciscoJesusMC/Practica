const mongoose = require("mongoose");
const URL = process.env.NODE_ENV=== "test" || "development" ? process.env.URL_TEST : process.env.URL;

const dbConnectNoSql = ()=>{
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(error)=>{
        if(error){
            console.log("CONEXION ERRONEA");
        }else{
            console.log(`CONEXION EXISOTA A ${URL}`)
        }
    })
};


module.exports = dbConnectNoSql;