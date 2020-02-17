const express = require("express");
const app = express();

app.set('view engine','ejs') // dizendo qual motor html quero utilizar, nesse caso o EJS

app.get("/:nome/:lang",(req,res) => {
    //res.send('Bem vindo ao nosso Portal'); // rota principal
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Coca-cola", preco: 5},
        {nome: "Leite", preco: 1.45},
        {nome: "Carne", preco: 15},
        {nome: "Redbull", preco: 6}
    ]

    //res.render("index") // desenhando o arquivo que está na pasta views
    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "Studio HackingX",
        funcionarios: 3000,
        msg: exibirMsg,
        produtos: produtos
    });
});

app.listen(8000,()=> {
    console.log("Server is running!");
});