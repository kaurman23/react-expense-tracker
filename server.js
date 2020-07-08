const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config({path:'.config/config.env'})

const app = express();

app.get("/",(req,res) => {
    res.send("Hello");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));