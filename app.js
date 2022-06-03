require("dotenv").config()
const express = require("express");
const cors =require("cors");
const dbConnectNoSql= require("./config/db");


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;

app.use("/api",require("./routes"));

const server = app.listen(PORT,()=>{
    console.log(`App corriendo en http://localhost:${PORT}`);
});


dbConnectNoSql();

module.exports = {app,server};
