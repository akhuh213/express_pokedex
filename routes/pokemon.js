var express = require('express');
var router = express.Router();
var db = require('../models');
const axios = require('axios'); 
const pokemon = require('../models/pokemon');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {

  db.pokemon.findAll()
  .then(poke =>{
      console.log(poke)
      res.render('pokemon', {pokemon: poke});
    }) .catch(error => {
      res.send(error, "error")
    
  })
})


// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB

  db.pokemon.findOrCreate({
    where: {
      name: req.body.name,
    }
  })
  res.redirect('/pokemon')
  })


  router.get('/:id', function(req, res) {
        
    let params = req.params.id;
   
    axios.get(`http://pokeapi.co/api/v2/pokemon/${params}`).then(response => {     
      let pokemon = response.data
      console.log(pokemon)
      res.render('show', {pokemon});
  })
  })
  

module.exports = router;
