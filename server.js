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


const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

// קריאה לקובץ data.json
const data = JSON.parse(fs.readFileSync('./data.json'));

app.get('/', (req, res) => {
  res.send('hello');
});

// ראוט לעמוד ה-REGISTER
app.post('/register', (req, res) => {
  const { name, exam1, exam2, exam3 } = req.body;

  // הוספת הנתונים למערך המכיל את הנתונים בפורמט המתאים
  data.push({
    name,
    exam1,
    exam2,
    exam3
  });

  // כתיבת הנתונים המעודכנים לקובץ data.json
  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

  res.status(201).send('Student added');
});

app.get('/test', (req, res) => {
  res.send('test hello');
});

module.exports = app;