const router = require('express').Router();
const users = require('./users-model.js');
const restricted = require('../auth/restricted');

router.get('/', restricted, (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
