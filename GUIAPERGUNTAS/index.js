const express = require("express");
const app = express(); // criando uma instância do express
const bodyParser = require("body-parser") // Vai traduzir os dados enviados pelo formulário
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

// Dizendo ao Express usar o EJS como View engine (motor html)
app.set('view engine','ejs');
app.use(express.static('public')); // Pasta onde ficam os arquivos estáticos

// Configurando o body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Criando rota de teste
app.get("/",(req,res) =>{
    Pergunta.findAll({ raw: true, order:[
        ['id','DESC'] // ASC = Crescente || DESC = Decrescente
    ]}).then(perguntas => { // SELECT * ALL FROM perguntas
        //console.log(perguntas);
        res.render("index", {
            perguntas: perguntas
        });
    });
    /*res.render("index",{

    }); // Desenhar alguma coisa na tela, nesse caso um arquivo html*/
});

app.get("/perguntar",(req,res)=> {
    res.render("perguntar");
});

app.post("/salvarpergunta",(req,res)=>{

    // Recebendo dados do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //res.send("Formulário Recebido! titulo " + titulo + " " + "descricao " + descricao);
    Pergunta.create({ // INSERT INTO perguntas ...
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/"); // Fazendo um redirect para a página principal
    });
});

// Criando rota com parâmetro
app.get("/pergunta/:id",(req,res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){ // Pergunta encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[ 
                    ['id','DESC']
                ]
            }).then(respostas => {
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                });
            });
        }else{ // Não foi encontrada
            res.redirect("/");
        }
    });
})

app.post("/responder",(req,res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId); // res.redirect("/pergunta/4,5,6...")
    });
});

app.listen(3000,()=>{
    console.log("App running!");
});