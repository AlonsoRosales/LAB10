const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParse = require('body-parser');
const multer = require('multer')

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


let upload = multer()


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

app.post('/mascota/create',bodyParse.urlencoded({extended :true}), bodyParse.json(),upload.none(),function (req, res){
    let nombre = req.body.nombre;
    let anho = req.body.anho;
    let historia = req.body.historia;
    let observaciones = req.body.observaciones;
    let sexo = req.body.sexo;
    let raza_especie_idraza = req.body.raza_especie_idraza;
    let raza_otros = req.body.raza_otros;
    let cuenta_idcuenta = req.body.cuenta_idcuenta;

    let params = [nombre,anho,historia,observaciones,sexo,raza_especie_idraza,raza_otros,cuenta_idcuenta]
    let sql = "INSERT INTO `sandylance`.`mascota` (`nombre`, `anho`, `historia`, `observaciones`, `sexo`, `raza_especie_idraza`, `raza_otros`,`cuenta_idcuenta`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(sql,params,function (err,result){
        if (err) throw err;
        res.json(result);
    })
})

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

app.post('/servicio/create/:idmascota?',bodyParse.urlencoded({extended :true}), bodyParse.json(),upload.none(),function (req,res) {
    let idmascota = req.params.idmascota;
    let servicio = req.body.idservicio;
    let cuenta = req.body.cuenta_idcuenta;
    let inicio = req.body.hora_inicio;
    let dura = req.body.duracion;
    let entre = req.body.entrega;
    let responsable = req.body.responsable_idresponsable;
    let params = [servicio,idmascota,cuenta,inicio,dura,entre,responsable]
    console.log(params)
    let sql = "INSERT INTO `sandylance`.`servicio` (`idservicio`, `mascota_idmascota`, `cuenta_idcuenta`, `hora_inicio`, `duracion`, `entrega`, `responsable_idresponsable`) VALUES (?,?,?, ?,?, ?, ?)";

    conn.query(sql,params,function (err,result){
        if(err){
            //{err: "No existe la mascota"}
            res.json(result);
        }else{
            res.json({success: "Se creo su servicio exitosamente"});
        }
    });

});



app.listen(3000, () => {
    console.log("servidor corriendo");
});