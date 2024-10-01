const express = require('express');
const usersRouter = require('./routes/usersRouter');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use('/', usersRouter);

// Error handling.
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).render('error.ejs', { title: 'An error occurred!', error });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => `Express app listening on port ${PORT}.`);
