var firebase = require('../config/firebase.js');
var db = firebase.database();
var ref = db.ref('/');
var author, title, category, quantity;

var BookController = {
    createBooks: function (req, res) {
        var bookRef = ref.child('books');
            bookRef.on('value', function(snapshot){
            console.log(snapshot.val());
            }) 

        ref.child('books').push({
            author: req.body.author,
            title: req.body.title,
            category: req.body.category,
            quantity: req.body.quantity 

        });

        

        


        // var booksRef = ref.child('books');
        // booksRef.orderByKey().limitToLast(1).on('child_added', function(snapshot){
        //     res.render('books', {added:snapshot.val()});
        // });



        // if (!req.body.author || !req.body.title || !req.body.category || !req.body.quantity) {
        //     return res.status(422).send({
        //         message: 'All fields are required',
        //         success: false
        //     });
        // }

        // else {
        //     return res.status(201).send({
        //         message: "All good"
        //     });
        // }
    },

    updateBooks: function(req, res){
        var id = req.params.id
        ref.child('books').child(id).update(req.body)

        var booksRef = ref.child('books');
        ref.child('books').on('child_changed', function(snapshot){
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

    deleteBooks: function(req, res){
        var id = req.params.id
        ref.child('books').child(id).remove()

        var booksRef = ref.child('books');
        booksRef.on('child_remove', function(snapshot){
            console.log('remove', snapshot.val());
        });

        // if(!req.body){
        //     return res.status(402).send({
        //         message:"Failed to Deleted",
        //         success: false
        //     });
        // }

        // else{
        //     return res.status(201).send({
        //         message: "Record has been Deleted"
        //     });
        // }
    },

    getBooks: function(req, res){
        var bookRef = ref.child('data');
            bookRef.on('value', function(snapshot){
            console.log(snapshot.val());
            }) 

        ref.once("value", function(data) {
            console.log('Hello')
          // do some stuff once
          return res.status(200).json({data})
        });
    }
}

module.exports = BookController;