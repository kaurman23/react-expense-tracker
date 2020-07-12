const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config({path:'./config/config.env'})

connectDB();

const transactions = require('./routes/transactions');

const app = express();
app.use(express.json());

app.use('/api/v1/transactions', transactions);

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}

app.listen(PORT, console.log(`Server running on port ${PORT}`));