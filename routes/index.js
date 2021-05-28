const express = require("express");
const router = express.Router();
const db = require("../db/index");


//Agregar Pokemon Atrapado
router.post("/api/atraparPokemon", async (req, res) => {
    
    try {
    const results = await db.query(`INSERT INTO captured_pokemon (pokemonId, api_version, name, first_slot, second_slot, img_url, trainerId) VALUES (${req.body.api_version},${req.body.name},${req.body.first_slot},${req.body.second_slot},${req.body.img_url},${req.body.trainerId});`);
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

router.post("/api/agregarEntrenador", async (req, res) => {
    
    try {
    const results = await db.query(`INSERT INTO pokemon_trainer (name, last_name, region, email) VALUES (${req.body.name},${req.body.last_name},${req.body.region},${req.body.email});`);
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

  router.get("/api/entrenadores", async (req, res) => {
    
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