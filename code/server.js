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
var patient_search_data = [];
var doctor_data = [];
var patient_data = [];
var no_result = '';
var info_mismatch = '';
var upd_info_mismatch = '';
var ins_date_invalid = '';
// set up ejs view engine 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '../public'));

/* GET home page, respond by rendering home.ejs */
app.get('/', function(req, res) {
	res.render('home');
	/*var advQuery1 = `SELECT DoctorID, 
			SUM(SoreThroat) as SoreThroatCount, 
			SUM(Headache) as HeadacheCount,
			SUM(StomachAche) as StomachAcheCount,
			SUM(Hives) as HiveCount,
			SUM(Cough) as CoughCount,
			SUM(Wound) as WoundCount,
			SUM(Burn) as BurnCount,
			SUM(MuscleAche) as MuscleAcheCount,
			SUM(Backpain) as BackPainCount,
			SUM(Acne) as AcneCount,
			SUM(ToothAche) as ToothAcheCount,
			SUM(BrokenBone) as BrokenBoneCount,
			AVG(Temperature) as TemperatureAvg,
			AVG(Height) as HeightAvg,
			AVG(Weight) as WeightAvg
		FROM Appointments JOIN Symptoms USING(PatientID) JOIN Patients USING(PatientID)
		GROUP BY DoctorID
		ORDER BY DoctorID ASC
		LIMIT 10`;
	var advQuery2 = `SELECT * 
			FROM Patients p
			WHERE p.PatientID NOT IN (
				SELECT v.PatientID
				FROM Vaccines v
				GROUP BY v.PatientID
				HAVING Max(VaccineDate) > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 10 YEAR)
			)
			LIMIT 10`;
	connection.query(advQuery1, function(err,result1) {
		doctor_data = result1;
		if (err) {
			res.send(err);
			console.log('errorbois');
			return;
		}
		connection.query(advQuery2, function(err,result2) {
			patient_data = result2;
			if (err) {
				res.send(err);
				return;
			}
		});	
	});
	patient_search_data = [];
	doctor_data = [];
	patient_data = [];
	no_result = '';
	info_mismatch = '';
	upd_info_mismatch = '';
	ins_date_invalid = '';*/
});

app.post('/go-to-patient', function(req, res) {
	res.redirect('/patient');
});
 
app.get('/patient', function(req, res) {
	res.render('patient', {patient_search_data: patient_search_data, action:'list',  doctor_data:doctor_data, patient_data:patient_data, no_result: no_result, info_mismatch: info_mismatch, upd_info_mismatch: upd_info_mismatch, ins_date_invalid: ins_date_invalid});
	patient_search_data = [];
	doctor_data = [];
	patient_data = [];
	no_result = '';
	info_mismatch = '';
	upd_info_mismatch = '';
	ins_date_invalid = '';
});

// this code is executed when a user clicks the form submit button
app.post('/patient/search', function(req, res) {
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
			patient_search_data = sql_result;
			no_result = '';
		} else {
			console.log('no one found');
			console.log(sql_result);
			patient_search_data = [];
			no_result = "Patient not found";
		}

		res.redirect('/patient');
  	});
});

app.get('/doctor', function(req, res) {

});

app.post('/add', function(req, res) {
	var PatientID;
	var FirstName = req.body.FirstName;
	var LastName = req.body.LastName;
	var BirthDate = req.body.BirthDate;
	var Height = req.body.Height;
	var Weight = req.body.Weight;

	var maxIDQry = `SELECT MAX(PatientID) as maxID FROM Patients`;
		connection.query(maxIDQry, function(err, result) {
			if (err) {
				res.send(err)
				return;
			}
			console.log(result[0].maxID);
			PatientID = parseInt(result[0].maxID);
			PatientID++;
			console.log(PatientID);
		
			console.log(BirthDate);
				
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

app.post('/update', function(req, res) {
	var PatientID = req.body.updPatientID;
	var FirstName = req.body.updFirstName;
	var LastName = req.body.updLastName;
	var Height = parseInt(req.body.updHeight);
	var Weight = parseInt(req.body.updWeight);

	var pidCheck = `SELECT FirstName, LastName FROM Patients WHERE PatientID = '${PatientID}'`;
	
	console.log(pidCheck);
	connection.query(pidCheck, function(err, result) {
		if (err) {
			res.send(err)
			return;
		}
		console.log(result[0]);

		if(FirstName != result[0].FirstName || LastName != result[0].LastName){
			console.log("names don't match");
			upd_info_mismatch = "Patient does not exist";
			res.redirect('/');
		}
		else{
			var updInfo = `UPDATE Patients SET Height = '${Height}', Weight = '${Weight}' WHERE PatientID = '${PatientID}'`;
			console.log(updInfo);
			connection.query(updInfo, function(err, result) {
				if (err){
					res.send(err);
					return;
				}
				res.redirect('/');
			});
		}
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
app.get('/advanceQuery1', function(req,res) {

	
var advQuery1 = `SELECT DoctorID, 
		SUM(SoreThroat) as SoreThroatCount, 
		SUM(Headache) as HeadacheCount,
		SUM(StomachAche) as StomachAcheCount,
		SUM(Hives) as HiveCount,
		SUM(Cough) as CoughCount,
		SUM(Wound) as WoundCount,
		SUM(Burn) as BurnCount,
		SUM(MuscleAche) as MuscleAcheCount,
		SUM(Backpain) as BackPainCount,
		SUM(Acne) as AcneCount,
		SUM(ToothAche) as ToothAcheCount,
		SUM(BrokenBone) as BrokenBoneCount,
		AVG(Temperature) as TemperatureAvg,
		AVG(Height) as HeightAvg,
		AVG(Weight) as WeightAvg
	FROM Appointments JOIN Symptoms USING(PatientID) JOIN Patients USING(PatientID)
	GROUP BY DoctorID
	ORDER BY DoctorID ASC
	LIMIT 10`;
	
	console.log("hi");
	console.log(advQuery1);
	connection.query(advQuery1, function(err,result) {
		doctor_data = result;
		if (err) {
			res.send(err);
			console.log('errorbois');
			return;
		}
		
		res.render('Doctors', {title: 'Advance Query 1', action:'list', doctor_data:result});
		
		
		console.log(doctor_data);
		res.redirect('/');
	});
});
//app.post('/advancequery2', function(req,res) {

//});

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
