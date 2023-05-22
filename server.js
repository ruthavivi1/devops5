// Import necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create express app
const app = express();

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect('mongodb://username:password@my-mongo.example.com/mydatabase', { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define student schema
const studentSchema = new mongoose.Schema({
  name: String,
  exam1: Number,
  exam2: Number,
  exam3: Number
});

// Create student model
const Student = mongoose.model('Student', studentSchema);

// Define register page route
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});

// Define form submission route
app.post('/register', (req, res) => {
  // Create new student object from form data
  const newStudent = new Student({
    name: req.body.name,
    exam1: req.body.exam1,
    exam2: req.body.exam2,
    exam3: req.body.exam3
  });

  // Save new student to database
  newStudent.save()
    .then(() => res.send('Student registered successfully'))
    .catch(err => console.log(err));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));