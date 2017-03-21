const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

//The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}))
// app.listen(process.env.PORT || 3000, () => {
//   console.log('listening on 3000')
// })

var db

MongoClient.connect('mongodb://manishjha:manishjha.123@ds137370.mlab.com:37370/my-first-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})


//path =When we’re visiting localhost:3000, our browsers are actually looking for localhost:3000/. The path argument in this case is /.
//callback =The second argument is a callback function that tells the server what to do when the path is matched. It takes in two arguments, a request object and a response object:
//app.get(path, callback)


app.get('/',(req,res,next)=>
{

  //res.sendFile(__dirname +  '/index.html');
// do something here
db.collection('quotes').find().toArray(function(err, results) {
console.log(results)

// renders index.ejs
    res.render('index.ejs',{quotes: results})
// send HTML file populated with quotes here
})


 // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
})
// Note: request and response are usually written as req and res respectively.

//The action attribute tells the browser where to navigate to in our Express app. In this case, we’re navigating to /quotes. The method attribute tells the browser what to request to send. In this case, it’s a POST request.
app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')

})
})

app.set('view engine', 'ejs')

//res.render(view, locals)
//The first parameter, views, is the name of the file we’re rendering. This file must be placed within a views folder
//The second parameter, locals, is an object that passes data into the view.
