var express = require('express');
var app = express();
var pg = require('pg');
var path = require('path');
var http = require('http');
var reload = require('reload');
var bodyParser = require('body-parser');
var cors = require('cors')

var publicDir = path.join(__dirname, 'public')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000)
app.set('address', '127.0.0.1')
app.use(cors())


var config = {
  user: 'candidate', //env var: PGUSER
  database: 'memory_tracker', //env var: PGDATABASE
  password: 'giap-quib-fac-wav-mi', //env var: PGPASSWORD
  host: 'aws-us-east-1-portal.8.dblayer.com', // Server hosting the postgres database
  port: 10131, //env var: PGPORT
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
});

// Tables: group number of instances for each web url  (pages and crashes
// Frequency of crashes: time between crashes
// number of bytes it was using - pages and bytes - always a certain amount 
//  

// CREATE TABLE reports (
//     id SERIAL,
//     timestamp integer NOT NULL,
//     bytes_used integer NOT NULL,
//     current_page varchar(255) NOT NULL,
//     did_aww_snap boolean NOT NULL
// );

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

/* Creating a line chart that tracks data ascending change of mem usage over time 
------------------------------------------------------------------------------------*/
 
var categories = ["/processes/editor", "/data", "/analytics", "/processes", "/", "/player"];


app.get('/get_line_chart', function (req, res) { // find which pages -> crashes 
  var ar = [];
  var index = []
  index.push(req.query.id);
  pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC', index)
    .then((result) => {
      for (var i = 0; i < result.rows.length; i++) {
        // ar.push(result.rows[i]['bytes_used'])
        ar.push({
          x: result.rows[i]['timestamp'],
          y: result.rows[i]['bytes_used']
        })
      }
      console.log(ar.length)
      res.jsonp(ar);
    })
    .catch((err) => {
      console.error('error running query', err);
  });
})

// app.get('/line_chart_0', function (req, res) { // find which pages -> crashes 
//   var ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[0]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         // ar.push(result.rows[i]['bytes_used'])
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       console.log(ar.length)
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })

// app.get('/line_chart_1', function (req, res) { // find which pages -> crashes 
//   ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[1]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         //ar.push(result.rows[i]['bytes_used']);
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       console.log(ar)
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })

// app.get('/line_chart_2', function (req, res) { // find which pages -> crashes 
//   var ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[2]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       console.log(ar.length)
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })

// app.get('/line_chart_3', function (req, res) { // find which pages -> crashes 
//   var ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[3]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })

// app.get('/line_chart_4', function (req, res) { // find which pages -> crashes 
//   var ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[4]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })

// app.get('/line_chart_5', function (req, res) { // find which pages -> crashes 
//   var ar = [];
//   pool.query('SELECT timestamp, bytes_used FROM reports WHERE current_page = $1::varchar ORDER BY timestamp ASC',[categories[5]])
//     .then((result) => {
//       for (var i = 0; i < result.rows.length; i++) {
//         ar.push({
//           x: result.rows[i]['timestamp'],
//           y: result.rows[i]['bytes_used']
//         })
//       }
//       res.jsonp(ar);
//     })
//     .catch((err) => {
//       console.error('error running query', err);
//   });
// })
/* -------------------------------------------------------------------------------------*/ 


app.get('/error_count', function (req, res) { // find which pages -> crashes 
  var ar = [];
  pool.query('SELECT current_page, COUNT(current_page) FROM reports WHERE did_aww_snap IS TRUE GROUP BY current_page')
    .then((result) => {
      for (var i = 0; i < result.rows.length; i++) {
        ar.push(result.rows[i]);
      }
      console.log('number:', ar);
      res.status(200).jsonp(ar);
    })
    .catch((err) => {
      console.error('error running query', err);
    });
})


var server = http.createServer(app)

// Reload code here
reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Web server listening on port " + app.get('port'));
});
