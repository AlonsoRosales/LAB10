const express = require('express');
const bodyParse = require('body-parser');
const multer = require('multer')
const mysql = require('mysql2')
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


app.post('/mascota/create',bodyParse.urlencoded({extended :true}), bodyParse.json(),upload.none(),function (req, res){
    let nombre = req.body.nombre;
    let anho = req.body.anho;
    let historia = req.body.historia;
    let observaciones = req.body.observacionesl;
    let sexo = req.body.sexo;
    let raza_especie_idraza = req.body.raza_especie_idraza;
    let raza_otros = req.body.raza_otros;
    let cuenta_idcuenta = req.body.cuenta_idcuenta;

    let params = [nombre,anho,historia,observaciones,sexo,raza_especie_idraza,raza_otros,cuenta_idcuenta]
    let sql = "INSERT INTO `sandylance`.`mascota` (`nombre`, `anho`, `historia`, `observaciones`, `sexo`, `raza_especie_idraza`, `raza_otros`,`cuenta_idcuenta`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    conn.query(sql,params,function (err,result){

    })
})

app.listen(3000,function (){
    console.log("Servidor corriendo en el puerto 3000")
})