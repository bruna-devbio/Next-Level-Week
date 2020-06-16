const express = require("express")
const server = express()
const db = require("./database/db")


//ligar o servidor
server.listen(3000)

// configurar pasta publica
server.use(express.static("public"))
//habilitar o req.body na aplicação
/* o express por padrão não tem o req.body habilitado*/
server.use(express.urlencoded({extended: true}))



//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
//página inicial
//req:requisição
//res: respostas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    console.log(req.query)  //São as query strings da URL
    return res.render("creat-point.html")
})

server.post("/savepoint", (req, res) => {
    // manda os dados do fomulários para uma nova rota, gerando uma resposta pro usuário
    //req.body: o corpo do nosso formulário
    // console.log(req.body)

    //inserir dados no banco de dados

    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            itens
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.itens
    ]


    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no cadastro!");
        }

        console.log("Cadastrado com sucesso");
        console.log(this);

        return res.render("creat-point.html", { saved: true });
    }

    db.run(query, values, afterInsertData);

})

server.get("/search", (req, res) => {

    const search = req.query.search;

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 });
    }


    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length;

        //mostrar a página html com os dados do db
        return res.render("search-results.html", { places: rows, total: total })
    })

})



