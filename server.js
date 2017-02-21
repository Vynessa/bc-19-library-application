const express = require("express");
const app = express();
//var admin = require("firebase-admin")
var firebase = require("firebase")



var config = {
  apiKey: "AIzaSyAvmhB6l1rXShvtiCmXTEHw6ywcLPlrz8Y",
  authDomain: "library-application-1f91f.firebaseapp.com",
  databaseURL: "https://library-application-1f91f.firebaseio.com",
  storageBucket: "library-application-1f91f.appspot.com",
  messagingSenderId: "617724297042"
};

firebase.initializeApp(config);

/*const auth = firebase.auth();

auth.signInWithEmailAndPassword(email, pass);
auth.createUserWithEmailAndPassword(email, pass);
auth.onAuthStateChanged(firebaseUser => { });*/

var port = process.env.PORT || 8080;

app.set('view engine', 'html')
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
})

app.get('/books', function(req, res) {
  res.sendFile(__dirname + "/views/books.html");
})

app.get('/authors', function(req, res) {
  res.sendFile(__dirname + "/views/authors.html");
})

//app.use('/', routes);

app.listen(port, function(req, res){
	console.log("Magic happens on Port " + port);
})
