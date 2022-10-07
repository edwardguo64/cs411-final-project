# DocHunt: Conceptual and Logical Design

## UML Diagram

<center>
    <img src = "CS411ProjectUML.jpeg" style = "float: left; margin-right; 10px;">
    <figcaption>UML Diagram</figccaptoin>
</center>

## Relational Schema

```
Doctors(DoctorID: VARCHAR(20) [PK], FirstName:VARCHAR(50), LastName:VARCHAR(5), Specialty:VARCHAR(255))

Patients(PatientID:VARCHAR(20) [PK], FirstName: VARCHAR(50), LastName: VARCHAR(50), BirthDate: DATE, Height: REAL, Weight: REAL)

Symptoms(PatientID:VARCHAR(20) [PK] [FK to Patients.PatientID], Date:DATE [PK], SoreThroat:BIT, Headache:BIT, StomachAche:BIT, Hives:BIT, Temperature:BIT, Cough:BIT, Wound:BIT, Burn:BIT, MuscleAche:BIT, BackPain:BIT, Acne:BIT, ToothAche:BIT, BrokenBone:BIT)

Appointments(PatientID:VARCHAR(20) [PK] [FK to Patients.PatientID], DoctorID:VARCHAR[20] [PK] [FK to Doctors.DoctorID], ApptDate:DATE [PK])

Prescriptions(PatientID: VARCHAR(20) [PK] [FK to Patients.PatientID], Medication: VARCHAR(255) [PK], IssueDate: DATE[PK], Dosage:INT)

Vaccines(PatientID: VARCHAR(20) [PK] [FK to Patients.PatientID], VaccineType: VARCHAR[255] [PK], Date: DATE)

Login(UserID: VARCHAR(20) [PK], UserType: VARCHAR(20), DateCreated:DATE, UserName: VARCHAR(50), Password: VARCHAR(50))
```
