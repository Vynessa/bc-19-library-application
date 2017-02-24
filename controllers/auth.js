var firebase = require('../config/firebase.js');
var db = firebase.database();
var ref = db.ref('/');
var fullname, username, email, password, admin, userId;

function createUsers(req, res){
    fullname = req.body.fullname;
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    admin = req.body.admin;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
            ref.child('users').push({
                fullname,
                username,
                email,
                password,
                admin
            });
            res.redirect('/')
        })
        .catch(function(error){
            var errorcode = error.code;
            var errorMessage = error.message;
            if (errorcode == 'auth/weak-password'){
                console.log('The password is too weak.');
                res.redirect('/signup')
            }
            else if (errorMessage === 'The email address is already in use by another account.' ){
                res.redirect('/login');
            }
             else{
                res.redirect('/signup')
            }
            console.log(error);
        });
}

function signIn(req, res){
    var email = req.body.email;
    var password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {res.redirect('/')})
        .catch(function(error){
            var errorcode = error.code;
            var errorMessage = error.message;
            if (errorcode == 'auth/weak-password'){
                console.log('The password is too weak.');
                res.redirect('/login')
            }
            else if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.' ){
                res.redirect('/signup');
            }
             else{
                res.redirect('/login')
            }
            console.log(error);
        });
}

module.exports = {createUsers, signIn};