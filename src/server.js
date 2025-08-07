const express = require('express');
const userController = require('./controllers/userController');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/register', userController.createUser);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});