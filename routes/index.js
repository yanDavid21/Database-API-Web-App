const express = require('express');
const path = require('path');
const mysql = require('mysql');

const app = express();
const router = express.Router();

//run server to database connection with admin privileges
const con = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: "chinook"
});

con.connect(function (err) {
  if (err) {
    console.log("Error connecting to database.")
  } else {
    console.log("Connected to database successfully.")
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/index.html'));
});

router.post('/', (req, res, next) => {
  con.query(req.body.queryString, function (err, result, fields) {
    if (err) {
      res.json({
        status: 'failure'
      })
    } else {
      let returnArr = [];
      result.forEach(element => {
        let obj = {};
        for (const key in element) {
          obj[key] = element[key];
        }
        returnArr.push(obj);
      })
      res.json({
        status: 'success',
        response: returnArr
      });
      res.end();
    }
  });
});

module.exports = router;
