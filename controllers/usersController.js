const usersStorage = require('../storages/usersStorage');
const { body, validationResult } = require('express-validator');

function usersListGet(req, res) {
  res.render('index', { title: 'User list', users: usersStorage.getUsers() });
}

function usersCreateGet(req, res) {
  res.render('createUser', { title: 'Create user' });
}

const alphaError = 'must only contain letters';
const lengthError = 'must be between 1 and 10 characters';

const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaError}.`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthError}.`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaError}.`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthError}.`),
];

const usersCreatePost = [
  validateUser,
  (req, res) => {
    const { firstName, lastName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: 'Create user',
        user: { firstName, lastName },
        errors: errors.array(),
      });
    }
    usersStorage.addUser({ firstName, lastName });
    res.redirect('/');
  },
];

function usersUpdateGet(req, res) {
  const user = usersStorage.getUser(req.params.id);
  res.render('updateUser', {
    title: 'Update user',
    user,
  });
}

const usersUpdatePost = [
  validateUser,
  (req, res) => {
    const id = req.params.id;
    const { firstName, lastName } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('updateUser', {
        title: 'Update user',
        user: { id, firstName, lastName },
        errors: errors.array(),
      });
    }
    usersStorage.updateUser(id, { firstName, lastName });
    res.redirect('/');
  },
];

function usersDeletePost(req, res) {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
}

module.exports = {
  usersListGet,
  usersCreateGet,
  usersCreatePost,
  usersUpdateGet,
  usersUpdatePost,
  usersDeletePost,
};
