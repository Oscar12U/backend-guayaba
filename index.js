require("dotenv").config();
const express = require("express");
const db = require("./db/index");
const app = express();
app.use(express.json());

console.log(process.env.PORT);
var port = process.env.PORT || 5000;

//Importar Routes
//app.use(require("./routes/index"));

const webserver = app.listen(port, function () {
  console.log("Corriendo web server");
});

app.post("/api/atraparPokemon", async (req, res) => {
    
  try {
  const results = await db.query(`INSERT INTO captured_pokemon (api_version, name, first_slot, second_slot, img_url, trainerId) VALUES (${req.body.api_version},${req.body.name},${req.body.first_slot},${req.body.second_slot},${req.body.img_url},${req.body.trainerId});`);
  res.json({ data: {
      msg: "Has atrapado un pokemon con exito"
  }});

  } catch (error) {
  res.json({ data: {
      msgError: "No se ha podido atrapar el pokemon",
      errorTipo: error
  }});
  }

});


//Agregar Entrenador

app.post("/api/agregarEntrenador", async (req, res) => {
  
  console.log(req.body.name)
  try {
  const results = await db.query(`INSERT INTO pokemon_trainer (trainerId, name, last_name, region, email) VALUES (${req.body.trainerId},${req.body.name},${req.body.last_name},${req.body.region},${req.body.email});`);
  
  res.json({ data: {
      msg: "Entrenador Pokemon agregado"
  }});

  } catch (error) {
  res.json({ data: {
      msgError: "No se ha podido agregar el Entrenador",
      errorTipo: error
  }});
  }

});

//Obtener Lista de Entrenadores

app.get("/api/entrenadores", async (req, res) => {
  
  try {
  const results = await db.query(`SELECT * FROM pokemon_trainer;`);
  res.json({ 
      results: results.rows.length,
      data: {
      result: results.rows
      }
  });

  } catch (error) {
  res.json({ data: {
      msgError: "No se ha podido agregar el Entrenador",
      errorTipo: error
  }});
  }

});

