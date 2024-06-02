const express = require('express');
const router = express.Router();
const characters = require('../data/characters');

router.get('/', (req, res) => {
  res.json(characters);
});

module.exports = router;
