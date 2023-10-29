const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const login = require('./routes/login');

app.use('/api', login);


app.listen(5173, () => {
  console.log('Server started!');
});