// //register.js
// const express=require('express')
// const app= express()

// app.get('/',(req,res)=>{
//     res.send('hello')
// })
// app.get('/test',(req,res)=>{
//     res.send('test hello')
    
// })

// module.exports=app


// const express = require('express');
// const app = express();
// const fs = require('fs');

// app.use(express.json());

// // קריאה לקובץ data.json
// const data = JSON.parse(fs.readFileSync('./data.json'));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'/register.html',(req,res)=>{
//     const { name, exam1, exam2, exam3 } = req.body;
//   }));
// });

// // ראוט לעמוד ה-REGISTER
// app.post('/register', (req, res) => {
//   const { name, exam1, exam2, exam3 } = req.body;

//   // הוספת הנתונים למערך המכיל את הנתונים בפורמט המתאים
//   data.push({
//     name,
//     exam1,
//     exam2,
//     exam3
//   });

//   // כתיבת הנתונים המעודכנים לקובץ data.json
//   fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

//   res.status(201).send('Student added');
// });

// app.get('/test', (req, res) => {
//   res.send('test hello');
// });

// module.exports = app;

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const db = require('./db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/register', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('An error occurred while fetching data from the database')
    } else {
      res.send(result.rows)
    }
  })
})

app.post('/register', (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body

  // Validate exam scores
  if (!Number.isInteger(exam1) || !Number.isInteger(exam2) || !Number.isInteger(exam3)) {
    return res.status(400).send('Exam scores must be integers')
  }

  db.query(
    'INSERT INTO students(name, exam1, exam2, exam3) VALUES($1, $2, $3, $4)',
    [name, exam1, exam2, exam3],
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).send('An error occurred while inserting data into the database')
      } else {
        res.send({ message: 'Data inserted successfully' })
      }
    }
  )
})

module.exports = app

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });