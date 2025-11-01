const express = require('express');
const app = express();
const port = 8000;
const db = require('./database');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

app.use(cors({
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.text());

app.get('/', (req, res) => {
  res.send('Welcome to CyberLab!')
});

const sqlInjectionRoutes = require('./routes/sqlInjectionRoutes');
app.use('/api/sqlinjection', sqlInjectionRoutes);

const csrfRoutes = require('./routes/csrfRoutes');
app.use('/api/csrf', csrfRoutes);

const xssRoutes = require('./routes/xssRoutes');
app.use('/api/xss', xssRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});