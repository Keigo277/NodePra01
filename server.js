const{engine}=require('express-handlebars');

const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

const PORT = 5000;

app.use(fileUpload());

app.engine("handlebars",engine());
app.set('view engine','handlebars');
app.set("views","./views");

// app.get("/",(req,res)=>{
//     res.send("<h1>Hello Express</h1>");
// })

app.get("/",(req,res)=>{
    res.render("home");
})

app.post("/",(req,res)=>{
    if(!req.files)
      return res.status(400).send("何も画像ファイルは入っていません。");
    else
      console.log(req.files);
})

app.listen(PORT,()=>{
    console.log("サーバー起動中。ポート番号:",PORT);
})