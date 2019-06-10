const bcrypt = require('bycrypt.js');
const users = require('../users/users-model.js');

module.exports = function restricted(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    users
      .findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).send('You shall not pass');
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'You shall not pass!' });
  }
};
