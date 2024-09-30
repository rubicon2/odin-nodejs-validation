const express = require('express');
const usersRouter = require('./routes/usersRouter');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Express app listening on port ${PORT}.`);
