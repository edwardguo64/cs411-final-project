var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql2');
var path = require('path');

var connection = mysql.createConnection({
                host: '146.148.58.134',
                user: 'root',
                password: 'seanrulez123',
                database: 'medicalmodel'
});

connection.connect;


var app = express();
var sql_result;
var sql_data = [];
var no_result = '';
var info_mismatch = '';

// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering index.ejs */
app.get('/', function(req, res) {
	res.render('index', { sql_data: sql_data, no_result: no_result, info_mismatch: info_mismatch});
	sql_data = [];
	no_result = '';
	info_mismatch = '';
});

app.get('/success', function(req, res) {
	res.render('index', { sql_result: "asdf" });
	res.send({'message': sql_result});
});
 
// this code is executed when a user clicks the form submit button
app.post('/mark', function(req, res) {
  var netid = req.body.netid;
   
  var sql = `SELECT * FROM Patients WHERE FirstName = '${netid}'`;
	


  console.log(sql);
  connection.query(sql, function(err, result) {
    if (err) {
      res.send(err)
      return;
    }
    sql_result = result;
	  console.log(sql_result);
	if (sql_result[0] != null) {
		console.log('found someone');
		console.log(sql_result);
		sql_data = sql_result;
		no_result = '';
	} else {
		console.log('no one found');
		console.log(sql_result);
		sql_data = [];
		no_result = "Patient not found";
	}

    res.redirect('/');
  });
});

app.post('/add', function(req, res) {
	var PatientID;
	var FirstName = req.body.FirstName;
	var LastName = req.body.LastName;
	var BirthDate = req.body.BirthDate;
	var Height = req.body.Height;
	var Weight = req.body.Weight;

	var maxIDQry = `SELECT MAX(PatientID) as maxID FROM Patients`

	connection.query(maxIDQry, function(err, result) {
		if (err) {
			res.send(err)
			return;
		}
		console.log(result[0].maxID);
		PatientID = parseInt(result[0].maxID);
		PatientID++;
		console.log(PatientID);

		var instData = `INSERT INTO Patients (PatientID, FirstName, LastName, BirthDate, Height, Weight) VALUES ('${PatientID}', '${FirstName}', '${LastName}', '${BirthDate}', '${Height}', '${Weight}')`;

		console.log(instData);
		connection.query(instData, function(err, result) {
			if (err) {
				res.send(err)
				return;
			}
			res.redirect('/');
		});
	});
});

app.post('/remove', function(req, res) {
	var pid = req.body.delPatientID;
	var fn = req.body.delFirstName;
	var ln = req.body.delLastName;

	var pidCheck = `SELECT FirstName, LastName FROM Patients WHERE PatientID = '${pid}'`;

	console.log(pidCheck);
	connection.query(pidCheck, function(err, result) {
		if (err) {
			res.send(err);
			return;
		}

		console.log(result[0]);

		if (fn != result[0].FirstName || ln != result[0].LastName) {
			console.log("names don't match");
			info_mismatch = "Patient ID does not match Patient Name";
			res.redirect('/');
		} else {
			var delInfo = `DELETE FROM Patients WHERE PatientID = '${pid}'`;

			console.log(delInfo);
			connection.query(delInfo, function(err, result) {
				if (err) {
					res.send(err);
					return;
				}
				res.redirect('/');
			});
		}
	});
});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
