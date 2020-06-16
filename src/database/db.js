//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

//iniciar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//exportar o banco de dados
module.exports = db;

//utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {

    //com comandos SQl, vamos:

    //1. Criar uma tabela
    /*
    db.run(`
         CREATE TABLE IF NOT EXISTS places (
             id INTEGER PRIMARY KEY AUTOINCREMENT,
             image TEXT,
             name TEXT,
             address TEXT,
             address2 TEXT,
             state TEXT,
             city TEXT,
             itens TEXT
         );
     `) 

    //2.Inserir dados na tabela 

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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papaerside",
        "Rua Guilherme Gerballa, Jardim América",
        "Nº 269",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]


    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }

        console.log("Cadastrado com sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData);

    /*passando a função como referência, ela 
    é passar a ser uma função callback, que só sera executada 
    após a resposta das requisições */


    //3. Consultar os dados da tabela
    /* para realizar a consulta, é necessário desabilitar a funçao 
    inserção de dados */
    /*
    db.all(`SELECT * FROM places`, function(err, rows){
        if (err) {
            return console.log(err);
        }

        console.log("Aqui estão seus registros: ");
        console.log(rows);
    })
    */


    //4. Deletar um dado da tabela
    /*
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
        if (err) {
            return console.log(err);
        }

        console.log("Registro deletado com sucesso!");
    })
    */

})