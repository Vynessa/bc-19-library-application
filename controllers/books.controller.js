var firebase = require('../config/firebase.js');
var db = firebase.database();
var ref = db.ref('/');
var author, title, category, quantity;

var BookController = {
    createBooks: function (req, res) {
        var bookRef = ref.child('books');
        bookRef.on('value', function (snapshot) {
            console.log(snapshot.val());
        })

        ref.child('books').push({
            author: req.body.author,
            title: req.body.title,
            category: req.body.category,
            quantity: req.body.quantity

        });

        res.redirect('/books');

    },

    updateBooks: function (req, res) {
        var id = req.params.id
        ref.child('books').child(id).update(req.body)

        var booksRef = ref.child('books');
        ref.child('books').on('child_changed', function (snapshot) {
            console.log('changed', snapshot.val());
        });

        // if(!req.body){
        //     return res.status(400).send({
        //         message:"Failed to Update Record",
        //         success: false
        //     });
        // }
        // else{
        //     return res.status(201).send({
        //         message: "Record has been Updated"
        //     });
        // }

    },

    deleteBooks: function (req, res) {
        var id = req.params.id
        ref.child('books').child(id).remove()

        if(!req.body){
            return res.status(402).send({
                message:"Failed to Deleted",
                success: false
            });
        }

        else{
            return res.status(201).send({
                message: "Record has been Deleted"
            });
        }

        // var booksRef = ref.child('books');
        // booksRef.on('child_remove', function (snapshot) {
        //     console.log('remove', snapshot.val());
        // });

    },

    getBooks: function (req, res) {
        var bookRef = ref.child('books');
        bookRef.orderByKey().once('value').then(function (books) {
            var bookObjs = [];
            var _books = books.val();
            // console.log(_books)
            for (var x in _books) {
                _books[x].key = x
                bookObjs.push(_books[x]);
                console.log(x);
            }
            console.log(bookObjs);
            //   console.log("books", bookObjs)
            res.render('pages/books', {
                books: bookObjs
            });
        });
    }

}

module.exports = BookController;