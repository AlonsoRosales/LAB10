const express = require('express');
const path = require('path');
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


app.get('/mascota/get/:id?',(req,res)=>{
    let idMascota = req.params.id;

    if(!idMascota){
        let sentencia = "SELECT * FROM mascota";
        conn.query(sentencia,function (err,results){
           if(err){
               res.json({err: "ocurrió un error"});
               throw err;
           }else{
               for(let i=0;i<results.length;i++){
                   if(results[i].raza_otros == null){
                       results[i].raza_otros = "Sin especificar";
                   }
               }
               res.json(results);
           }
        });
    }else{
        let sql = "SELECT * FROM mascota WHERE idmascota = ?";

        let params = [idMascota];

        conn.query(sql,params,function (err,results){
            if (err){
                res.json({err: "ocurrió un error"});
                throw err;
            }else{
                if(results.length == 0){
                    res.json({err: "No existe la mascota"});
                }else{
                    for(let i=0;i < results.length;i++){
                        if(results[i].raza_otros == null){
                            results[i].raza_otros = "Sin especificar";
                        }
                    }
                    res.json(results);
                }
            }

        });
    }

});


app.listen(3000, () => {
    console.log("servidor corriendo");
});