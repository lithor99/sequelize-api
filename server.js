const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
// require('./config/db');
const routes = require('./routes/routes')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(routes)

app.get('/', (req, res) => {
    return res.json('Welcome to my api');
});

const port = process.env.PORT || 8800;



app.listen(port, () => {
    console.log(`Server is runing on port: ${port}`);
});




