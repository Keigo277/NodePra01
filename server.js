const{engine}=require('express-handlebars');

const express = require("express");
const app = express();

const PORT = 5000;


app.engine("handlebars",engine());
app.set('view engine','handlebars');
app.set("views","./views");

// app.get("/",(req,res)=>{
//     res.send("<h1>Hello Express</h1>");
// })

app.get("/",(req,res)=>{
    res.render("home");
})

app.listen(PORT,()=>{
    console.log("サーバー起動中。ポート番号:",PORT);
})