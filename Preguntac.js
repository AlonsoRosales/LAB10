/*const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const bodyParse = require('body-parser');
const multer = require('multer');*/
const express = require('express');
const bodyParse = require('body-parser');
const multer = require('multer');
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

let upload = multer();

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