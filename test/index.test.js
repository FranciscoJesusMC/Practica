const mongoose = require("mongoose")
const Category = require("../models/category");
const {server} = require("../app");

const {api,initialCategory,getAllNameFromCategory} = require("../test/helpers");


beforeEach(async()=>{
    await Category.deleteMany({})

    //Agregado sequencial
    for(const category of initialCategory){
        const categoryObjetct = await Category(category)
        await categoryObjetct.save();
    }
});

describe("Validando cabecera",()=>{
    test("notas se devuelven en json",async()=>{
        await api
         .get("/api/category/all")
         .expect(200)
         .expect("Content-type", /application\/json/);
     });
})


//GET

describe("GET /api/category/all",()=>{
    test("Que sea igual a la longuitud de categorias iniciales",async ()=>{
        const response = await api.get("/api/category/all");
        expect(response.body).toHaveLength(initialCategory.length);
    });
    
    test("Que la primera categoria sea tv",async()=>{
        const response = await api.get("/api/category/all");
        expect(response.body[0].name).toBe("tv");
    });
    
    test("QUe una categoria tenga este valor",async()=>{
        const {categorys} = await getAllNameFromCategory();
        expect(categorys).toContain("keyboard")
    });
})

//POST

describe("POST /api/category/register",()=>{
    test("Ingresando una nueva categoria",async()=>{
        const newCategory={
            name:"mouses"
        }
    
        await api
        .post("/api/category/register")
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI5OTVhNzZiNTk1ODg3MDVmZWY0NzYwIn0sImlhdCI6MTY1NDI4OTYyMCwiZXhwIjoxNjU0Mjk2ODIwfQ.Vmb1y4LbZU3T3Pb135bN7oVDj2eF6Z5ATJkgEusNhAM')
        .send(newCategory)
        .expect(200)
        .expect("Content-type",/application\/json/)
    
        const {categorys,response}  = await getAllNameFromCategory();

        expect(response.body).toHaveLength(initialCategory.length + 1);
        expect(categorys).toContain(newCategory.name);
    });
    
    
    test("Que al ingresar una categoria vacia devuelva un status 400",async()=>{
        const newtCategory={};
    
        await api
        .post("/api/category/register")
        .send(newtCategory)
        .expect(400)
    
        const response = await api.get("/api/category/all");
        expect(response.body).toHaveLength(initialCategory.length);
    
    });
})


//DELETE

describe("DELETE /api/category/:id",()=>{
    test("Que la nota sea eliminada",async()=>{
        const {response:firstResponse} = await getAllNameFromCategory();
        const {body:cat} = firstResponse;
        const categoryToDelete = cat[2];

        await api
        .delete(`/api/category/${categoryToDelete._id}`)
        .expect(200);
        
        const {categorys, response: secondResponse} = await getAllNameFromCategory();
        expect(secondResponse.body).toHaveLength(initialCategory.length - 1);
        expect(categorys).not.toContain(categoryToDelete.content);
    })


    test("Que devuelva 400 si no existe ese id",async()=>{
        const categoryToDelete={
            _id:"1234",
            name:"Cubiertos"
        };

        await api
        .delete(`/api/category/${categoryToDelete._id}`)
        .expect(400)

        const {categorys,response:newCategorias} = await getAllNameFromCategory();
        expect(newCategorias.body).toHaveLength(initialCategory.length);
        expect(categorys).not.toContain(categoryToDelete);
    })
    
    test("Que devuelva 400 si esta vacio el id",async()=>{
        const categoryToDelete={
            _id:"",
            name:"Hola"
        }

        await api
        .delete(`/api/category/${categoryToDelete._id}`)
        .expect(404)

        const {categorys, response} = await getAllNameFromCategory();
        expect(response.body).toHaveLength(initialCategory.length);
        expect(categorys).not.toContain(categoryToDelete.content)
    })
});


//PUT
describe("PUT /api/category/:id",()=>{
    test("Que ctualize la primera categoria",async()=>{
        const {response:getCategory} = await getAllNameFromCategory();
        const {body:cat} = getCategory;
        const updateCat = cat[0];
        const newValor = {
            name:"watch"
        }

        await api
        .put(`/api/category/${updateCat._id}`)
        .send(newValor)
        .expect(200)

        const {categorys,response:newCategorys} = await getAllNameFromCategory();
        expect(newCategorys.body).toHaveLength(initialCategory.length);
        expect(categorys).toContain(newValor.name);
    });


    test("Que devuelva error si no se ingresa id",async()=>{
        const newValor ={
            name:"NuevaCat"
        }

        await api
        .put(`/api/category/`)
        .send(newValor)
        .expect(404)

        const {categorys, response:newCategorys} = await getAllNameFromCategory();
        expect(newCategorys.body).toHaveLength(initialCategory.length);
        expect(categorys).not.toContain(newValor.name)
    });


    test("Que devuelva status 400 si el id no existe",async()=>{
        const valor = {
            _id:"holasoyunid",
            name:"relojes"
        }
        const newValor={
            _id:"holasoyunid",
            name:"Refrigeradoras"
        }

        await api
        .put(`/api/category/${valor._id}`)
        .send(newValor)
        .expect(400)

        const {categorys,response} = await getAllNameFromCategory();
        expect(response.body).toHaveLength(initialCategory.length);
        expect(categorys).not.toContain(newValor.name);
    });


});

//const response = await api.get("/api/category/all");
//const categorys =  response.body.map(category => category.name);


afterAll(()=>{
    mongoose.connection.close()
    server.close()
});