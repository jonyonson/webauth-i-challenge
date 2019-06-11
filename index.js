const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./users/users-router');
const authRouter = require('./auth/auth-router.js');

const server = express();

const sessionConfig = {
  name: 'monk', // by default it would be sid
  secret: 'keep it secret, keep it safe!',
  resave: false, // if there are no changes to the session don't save it
  saveUninitialized: true, // for GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10, // in milliseconds
    secure: false, // send e only over https, set to true in production
    httpOnly: true, // always set to true, it means client can't acess the cookie
  },
  store: new KnexSessionStore({
    knex: require('./data/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60,
  }),
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// server check
server.get('/', (req, res) => {
  res.send('API is running');
});

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} **\n`));
