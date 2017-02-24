const express = require('express'),
router = express.Router();
var ctrl = require('../controllers/auth.js');
var booksCtrl = require('../controllers/books.controller.js')

router.get('/', (req, res) => {
  res.render('pages/index');
});

router.get('/books', booksCtrl.getBooks, (req, res) => {
    res.render('pages/books', {
      title: 'Books'
    });
  })
  .post('/books', booksCtrl.createBooks)
  .put('/books/:id', booksCtrl.updateBooks);

router.get('/authors', (req, res) => {
  res.render('pages/authors', {title: 'Authors'});
});

router.get('/categories', (req, res) => {
  res.render('pages/categories', {title: 'Categories'});
});

router.get('/bookdelete', booksCtrl.deleteBooks)
});

router.get('/login', (req, res) => {
  res.render('pages/login', {
    title: 'Login'});
})
.post('/login', ctrl.signIn);


router.get('/signup', (req, res) => {
  res.render('pages/signup', {
    title: 'SignUp'});
})
.post('/signup', ctrl.createUsers);



module.exports = router;