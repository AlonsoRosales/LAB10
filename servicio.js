const express = require("express");
const path = require("path");
const mysql = require('mysql2');
const app = express();

let conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: 'root',
    port: 3306,
    database : 'sandylance'
});

conn.connect(function (err){
    if(err) throw err;
    console.log("Conexion exitosa")
});

app.post("/servicio/create",function (request,response){

});
app.get('/cuenta/get/:id?',function (request,response){
    let idCuenta = request.params.id;
    if(!idCuenta){
        let q = "select * from cuenta";
        conn.query(q,function (err,results){
            if(err){
                console.log("Sucede algo malo")
                response.json({err: "No se puede ejecutar el query"});
                throw err;
            }else{
                response.json(results);
            }
        });
    }else{
        let q = "select * from cuenta where idcuenta = ?";
        let q_param = [idCuenta];
        conn.query(q,q_param,function (err,results){
            if (err){
                response.json({err: "No se puede ejecutar el query"});
                throw err;
            }else{
                if(results.length == 0){
                    response.json({err: "No existe la cuenta"});
                }else{
                    response.json(results);
                }
            }
        });
    }
});

app.listen(3000,()=>{
    console.log("Servidor Levantandose");
});