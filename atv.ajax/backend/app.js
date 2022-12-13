const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/curriculoemelyatv1.db';

const hostname = '127.0.0.1';
const port = 3004;
const app = express();

app.use(express.static(".."));
/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());

app.get('/volta', function(req,res){
    res.redirect('/');
});

// Retorna todos registros (é o R do CRUD - Read)
app.get('/listaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM usuario ORDER BY nome COLLATE NOCASE';
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO usuario (nome, idade, e-mail, endereco, telefone) VALUES ('" + req.body.nome + "', '" + req.body.idade + "', " + req.body.email + ", '" + req.body.endereco + "', '" + req.body.telefone + "')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.redirect("/volta");
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaUsuario', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "SELECT * FROM usuario WHERE cod_usuario="+ req.query.cod_usuario;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE curriculo SET nome='" + req.body.nome + "', idade= '" + req.body.idade + "' , email='" + req.body.email + "', endereco= '" + req.body.endereco + "' , telefone= '"+req.body.telefone + "' WHERE cod_usuario='" + req.body.cod_usuario + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("/volta");
    db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeUsuario', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "DELETE FROM usuario WHERE cod_usuario='" + req.query.cod_usuario + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.redirect("/volta");
        res.end();
    });
    db.close(); // Fecha o banco
});
 ////////////////////////////////////////////////////////////////////////////////

 // Retorna todos registros (é o R do CRUD - Read)
app.get('/listaFormacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    var sql = 'SELECT * FROM formacao ORDER BY curso COLLATE NOCASE';
        db.all(sql, [],  (err, rows ) => {
            if (err) {
                throw err;
            }
            res.json(rows);
        });
        db.close(); // Fecha o banco
});

// Insere um registro (é o C do CRUD - Create)
app.post('/insereFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    sql = "INSERT INTO formacao (curso, data_de_inicio, data_de_formacao, instituicao) VALUES ('" + req.body.curso + "', '" + req.body.data_de_inicio + "', " + req.body.data_de_formacao + ", '" + req.body.instituicao + "')";
    console.log(sql);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }	
    });
    res.redirect("/volta");
    db.close(); // Fecha o banco
    res.end();
});

// Monta o formulário para o update (é o U do CRUD - Update)
app.get('/atualizaFormacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "SELECT * FROM formacao WHERE id="+ req.query.id;
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.all(sql, [],  (err, rows ) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close(); // Fecha o banco
});

// Atualiza um registro (é o U do CRUD - Update)
app.post('/atualizaFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql = "UPDATE formacao SET curso='" + req.body.curso + "', data_de_inicio= '" + req.body.data_de_inicio + "' , data_de_formacao='" + req.body.data_de_formacao + "', instituicao= '" + req.body.instituicao + "' WHERE id='" + req.query.id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH);
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.end();
    });
    res.redirect("/volta");
    db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/removeFormacao', urlencodedParser, (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    sql = "DELETE FROM formacao WHERE id='" + req.query.id + "'";
    console.log(sql);
    var db = new sqlite3.Database(DBPATH); // Abre o banco
    db.run(sql, [],  err => {
        if (err) {
            throw err;
        }
        res.redirect("/volta");
        res.end();
    });
    db.close(); // Fecha o banco
});
 
app.listen(port, hostname, () => {
console.log(`Servidor rodando em http://${hostname}:${port}/`);
});