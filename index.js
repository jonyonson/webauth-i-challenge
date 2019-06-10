const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server check
server.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`\n** Running on port ${PORT} **\n`));
