const express = require("express");
const path = require("path");
const app = express();

app.post("/servicio/create",function (request,response){

});
app.get("/cuenta/get",function (request,response){

});
app.listen(3000,()=>{
    console.log("Servidor Levantandose");
});