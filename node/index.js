const express = require("express");
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const mysql = require("mysql");

const connection = mysql.createConnection(config);

const createTable =
  "CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)";

connection.query(createTable);

const sql = "INSERT INTO people(name) VALUES ('Igor')";

connection.query(sql);

const findNames = "SELECT name FROM people";

const names = [];
connection.query(findNames, (error, results, fields) => {
  if (error) {
    console.error("Erro ao executar query: " + error.stack);
    return;
  }

  names.push(results.map((result) => `<li>${result.name}</li>`));
});

connection.end();

const app = express();

const port = 3000;

app.get("/", (req, res) => {

  res.send("<h1>Full Cycle Rocks!</h1>" + "<br>" + `<ul>${names}</ul>`);
});

app.listen(port);

console.log("Rodando na porta " + port);
