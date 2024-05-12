require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const os = require('os');
const interfaces = os.networkInterfaces();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const login = require('./routes/login');
const signup = require('./routes/signup');
const fileTransfer = require('./routes/fileTransfer');

app.use('/api', login);
app.use('/api', signup);
app.use('/api', fileTransfer);

const mongo = async () => await mongoose.connect(process.env.MONGO_DB);

mongo()
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

      for (let devName in interfaces) {
        let iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
          let alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            console.log('You can access the server at', alias.address + ':' + PORT);
            console.log('Make sure the devices are connected to the same network(wifi).');
          }
        }
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
