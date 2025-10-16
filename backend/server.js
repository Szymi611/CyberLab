const express = require('express');
const app = express();
const port = 8000;
const db = require('./database');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to CyberLab!')
});

const sqlInjectionRoutes = require('./routes/sqlInjectionRoutes');
app.use('/api/sqlinjection', sqlInjectionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});