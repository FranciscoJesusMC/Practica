const {app} = require("../app");
const supertest = require("supertest");
const api = supertest(app);

const initialCategory =[
    {
        name:"tv"
    },
    {
        name:"phones"
    },
    {
        name:"keyboard"
    }
    
];


const getAllNameFromCategory = async()=>{
    const response =  await api.get("/api/category/all")
    return{
        categorys: response.body.map(category => category.name),
        response
    }
}

module.exports = {api,initialCategory,getAllNameFromCategory};