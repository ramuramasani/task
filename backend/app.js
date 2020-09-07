const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const List = require('./models/list');

const app = express();

mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0.umgw5.mongodb.net/<dbname>?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/lists', (req, res, next) => {
  const list = new List({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    seats: req.body.seats,
    attendee: req.body.attendee
  });
  list.save();
  res.status(201).json({
    message: 'List added successfully'
  });
});

app.get('/lists',(req, res, next) => {
  List.find()
    .then(documents => {
      res.status(200).json({
        message: 'List fetched successfully',
        lists: documents
      });
    });
});

app.delete('/lists/:id', (req, res, next) => {

});

module.exports = app;
