const{engine}=require('express-handlebars');

const express = require("express");
const fileUpload = require("express-fileupload");
const mysql = require("mysql2");
const app = express();

const PORT = 5000;

app.use(fileUpload());

app.use(express.static("upload"));

app.engine("handlebars",engine());
app.set('view engine','handlebars');
app.set("views","./views");

const pool = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"newgate1876",
  database:"image_uploader"
});



// app.get("/",(req,res)=>{
//     res.send("<h1>Hello Express</h1>");
// })

app.get("/",(req,res)=>{
    // res.render("home");
    pool.getConnection((err,connection)=>{
      if(err) throw err;
      console.log("接続中・・・");
      connection.query("select * from img_second",(err,rows)=>{
        connection.release();

        console.log(rows);
        if(!err){
          res.render("home",{rows})
        }
      })
    });
})

app.post("/",(req,res)=>{
    if(!req.files){
      return res.status(400).send("何も画像ファイルは入っていません。");
    }
      console.log(req.files);

    let imageFile = req.files.imageFile;
    let uploadPath = __dirname + "/upload/" + imageFile.name;

    //サーバーに画像ファイルを置く場所を指定
    imageFile.mv(uploadPath,(err)=>{
        if(err) return res.status(500).send(err);
        // res.send("画像のアップロードに成功しました！！！");
    });

    pool.getConnection((err,connection)=>{
      if(err) throw err;
      console.log("接続中・・・");
      connection.query(`insert into img_second values ("","${imageFile.name}")`,(err,rows)=>{
        connection.release();

        // console.log(rows);
        if(!err){
          res.redirect("/");
        }else{
          console.log(err);
        }
      })
    });

});

app.listen(PORT,()=>{
    console.log("サーバー起動中。ポート番号:",PORT);
})