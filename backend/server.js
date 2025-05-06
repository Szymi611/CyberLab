const express = require('express');
const app = express();
const port = 8000;
const db = require('./database');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to CyberLab!')
});

app.post('/sqlinjection', (req, res) => {
  console.log(req.body)
  const {username, password} = req.body;

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  db.get(query, (err, user) => {
    if(err){
      res.status(500).send('Internal Server Error');
    }
    if(user){
      res.status(200).send(`Hello ${user.username}!`);
    }else{
      res.status(401).send('Unauthorized');
    }
  });
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});