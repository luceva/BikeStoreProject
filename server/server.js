var express = require('express')           // http server framework
var bodyParser = require('body-parser')    // post/get/update parser
var mongoose = require('mongoose')         // db adaptor
var path = require('path')                 // file path handler
var routes = require('./routes')           // define behavior of various routes
var cons = require('consolidate')          // template engine mapper
var defs = require('./defs')               // predefined constants

var env = process.env.NODE_ENV || defs.production  // get NODE_ENV or 'production'

console.log('Starting app with:' + env)

var app = module.exports = express()

var dbname = '2017_STORE_DB'

if (env === defs.testing) {
  dbname = 'test'
} else if (env === defs.development) {
  dbname = 'dev'
}

mongoose.connect('mongodb://mongo:27017/' + dbname, {useMongoClient: true})

app.set('port', 3000)
app.use(express.static(path.resolve(__dirname, '../static')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.engine('html', cons.underscore)
app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'html')

app.get('/', function (req, res) {
  res.render('index')
})

app.use('/api', routes)

app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'))
})
