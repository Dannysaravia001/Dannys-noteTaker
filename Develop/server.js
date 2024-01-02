const express = require('express')
const htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')
const path = require('path')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(expreess.json());
app.use(express.urlencoded({ extended: true}));

