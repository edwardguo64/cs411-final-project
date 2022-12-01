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
var has_patient_searched = 0;
var pat_table_idx = 0;
var has_doctor_searched = 0;
var has_doctor_searched1 = 0;
var doc_table_idx = 0;
var patient_search_data = [];
var patient_search_data1 = [];
var symptom_search_data = [];
var prescription_search_data = [];
var doctor_data = [];
var patient_data = [];
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
	res.render('patient', {has_patient_searched: has_patient_searched, pat_table_idx: pat_table_idx, patient_search_data: patient_search_data, action:'list', doctor_data:doctor_data});
	patient_search_data = [];
	doctor_data = [];
});

app.post('/patient/search-patients', function(req, res) {
	var name = req.body.name;

	var sql = `SELECT * FROM Patients WHERE FirstName = '${name}'`;

	has_patient_searched = 1; // used to show table after first press of search, no need to reset after search
	pat_table_idx = 0;

	console.log(sql);
	connection.query(sql, function(err, result) {
		patient_search_data = result;
		console.log(patient_search_data);
		if (err) {
			res.send(err)
			return;
		}

		res.redirect('/patient');
  	});
});

app.post('/patient/search-doctors', function(req, res) {
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
	
	has_patient_searched = 1; // used to show table after first press of search, no need to reset after search
	pat_table_idx = 1;

	console.log(advQuery1);
	connection.query(advQuery1, function(err,result) {
		doctor_data = result;
		console.log(doctor_data);
		if (err) {
			res.send(err);
			console.log('errorbois');
			return;
		}

		res.redirect('/patient');
	});
});

app.post('/go-to-doctor', function(req, res) {
	res.redirect('/doctor');
});

app.get('/doctor', function(req, res) {
	res.render('doctor', {has_doctor_searched: has_doctor_searched, has_doctor_searched1: has_doctor_searched1, doc_table_idx: doc_table_idx, patient_search_data1: patient_search_data1, patient_data: patient_data, symptom_search_data: symptom_search_data, prescription_search_data: prescription_search_data});
	patient_search_data1 = [];
	patient_data = [];
	symptom_search_data = [];
	prescription_search_data = [];
});

app.post('/doctor/search-patients', function(req, res) {
	var name = req.body.name1;

	var sql = `SELECT * FROM Patients WHERE FirstName = '${name}'`;

	has_doctor_searched1 = 1; // used to show table after first press of search, no need to reset after search

	console.log(sql);
	connection.query(sql, function(err, result) {
		patient_search_data1 = result;
		console.log(patient_search_data1);
		if (err) {
			res.send(err)
			return;
		}

		res.redirect('/doctor');
  	});
});

app.post('/doctor/symptoms-search', function(req, res) {
	var patientid = req.body.pid;

	// checks on the text box input
	if (patientid == '') {
		patientid = 0;
	}
	
	var sql = `SELECT * FROM Symptoms WHERE PatientID = ${patientid} ORDER BY DigDate DESC`;

	has_doctor_searched = 1;
	doc_table_idx = 0;

	console.log(sql);
	connection.query(sql, function(err, result) {
		symptom_search_data = result;
		console.log(symptom_search_data);
		if (err) {
			res.send(err)
			return;
		}

		res.redirect('/doctor');
  	});
});

app.post('/doctor/prescription-search', function(req, res) {
	var patientid = req.body.pid;

	// checks on the text box input
	if (patientid == '') {
		patientid = 0;
	}

	var sql = `SELECT * FROM Prescriptions WHERE PatientID = ${patientid} ORDER BY IssueDate DESC`;

	has_doctor_searched = 1;
	doc_table_idx = 1;

	console.log(sql);
	connection.query(sql, function(err, result) {
		prescription_search_data = result;
		console.log(prescription_search_data);
		if (err) {
			res.send(err)
			return;
		}

		res.redirect('/doctor');
  	});
});

app.post('/doctor/vac-overdue', function(req, res) {
	var advQuery2 = `SELECT * 
		FROM Patients p
		WHERE p.PatientID NOT IN (
			SELECT v.PatientID
			FROM Vaccines v
			GROUP BY v.PatientID
			HAVING Max(VaccineDate) > DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 10 YEAR)
		)
		LIMIT 10`;

	has_doctor_searched = 1;
	doc_table_idx = 2;
	
	connection.query(advQuery2, function(err,result) {
		if (err) {
			res.send(err);
			return;
		}
		patient_data = result;
		console.log(patient_data);

		res.redirect('/doctor');
	});
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

app.listen(80, function () {
    console.log('Node app is running on port 80');
});
