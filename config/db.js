const mongoose = require("mongoose");
const URL = process.env.URL;

const dbConnectNoSql = ()=>{
    mongoose.connect(URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },(error)=>{
        if(error){
            console.log("CONEXION ERRONEA");
        }else{
            console.log("CONEXION EXITOSA")
        }
    })
};


module.exports = dbConnectNoSql;