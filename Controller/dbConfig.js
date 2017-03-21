
var db

MongoClient.connect('mongodb://manishjha:manishjha.123@ds137370.mlab.com:37370/my-first-db', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

var exports = module.exports = {};
