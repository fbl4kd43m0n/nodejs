const express = require("express"); // Importando o Express
const app = express(); // Iniciando o Express



app.get("/",function(req,res){ // Criando rota e definindo a rota inicial do aplicativo
   res.send("<h1>HOME</h1>") // devolvendo uma resposta
}); 

app.get("/blog/:artigo?",function(req,res){ // Aqui o parâmetro é opcional

    var artigo = req.params.artigo;

    if(artigo){
        res.send("<h2>Artigo: " + artigo + " </h2>")
    }else{
        res.send('<h1>BLOG: www.studiohackingx.com</h1>')
    }

    
});



app.get("/canal/youtube", function(req,res){

    var canal = req.query["canal"];

    if(canal) {
        res.send(canal)
    }else{
        res.send("Nenhum canal fornecido!");
    }
});

app.get("/analisar/:url",function(req,res){
    // req são os dados enviados pelo usuário
    // res resposta que vai ser enviada ao usuário
    var url = req.params.url;
    res.send("<h1>Analisando: " + url + " </h1>")
});

app.get("/ola/:nome/:empresa",function(req,res){
    var nome = req.params.nome;
    var empresa = req.params.empresa;
    res.send("<h1>Nome: " + nome + " Empresa: " + empresa + " </h1>")
});


app.listen(4000,function(erro){
    if(erro) {
        console.log("An error ocurred!")
    }else{
        console.log("Successfull!")
    }
});