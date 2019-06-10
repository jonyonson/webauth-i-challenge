const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server check
server.get('/', (req, res) => {
  res.send('API is running');
});

server.use('/api/users', usersRouter);
server.use('/api/', authRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} **\n`));
