# DocHunt: Project Proposal

## Summary

A web application designed to help patients find a doctor who has the perfect experience and skills to help them, and to help doctors keep track of information about their patients. Databases will keep track of patients, doctors, medications, vaccinations, and other key information. Doctors will be able to input information about their patients. Patients will be able to view their data, and also search through the doctors that are stored to find one they think could help them, with the ability to sort by a variety of variables including their current symptoms. The application will have advanced search capabilities to find doctors who are especially well equipped to help the patient.

## Description

We will create a few databases containing information on patients, doctors, vaccinations, and prescriptions. Our website will have two different modes of access: one for doctors, and another for patients. Each account will be for either a doctor or a patient, and users will have to log in before doing anything. Doctors can input information about their patients, and this data will be added to the appropriate database. The doctor can also look up information about patients. This will provide doctors with a way to keep track of information about their patients in an organized way, and also will help them find new patients through increased visibility.

Patients will have the ability to search for doctors or medications that might best match their needs. The patient will be able to input information about what symptoms they are currently experiencing, as well as other preferences, to search for doctors. The application will be able to make advanced queries on the database and return a list of doctors who would fit the patient well. This will allow people seeking medical advice to easily find the person best suited to helping them out. The patient would also be able to see what vaccinations they are overdue for.


## Usefullness

Everybody has their own unique set of circumstances that influence what doctor they want to see. It can be hard to find the perfect doctor to suit your needs. Existing websites don’t always have the information you're looking for, or can leave you sifting through long lists looking for a couple specific things. Typically patients would be referred to specialized doctors through their general doctor, but a variety of factors could make that inconvenient or not optimal. General doctors don’t know everybody, and not everybody has a general doctor or wants to schedule appointments on short notice, just to find a different doctor. Through this application, patients would be able to find specialized doctors directly. 

Furthermore, additional functionality like prescriptions and vaccinations would allow doctors to have access to more information to make better informed decisions for their patients. At the same time, they would make themselves more visible to patients looking for the specific skills they have to offer.


## Realness

We would need 5 different data tables: one for the doctor information, one for patient information, one for medication for each patient, one for patient vaccine information, and one for login information. Since this information is confidential, we would need to generate our own data. We can do this on https://www.mockaroo.com/ which allows us to input the columns and it will generate data for us. The doctor information stores information on the doctor’s name and speciality. The patient information stores the patient’s name, birth year, and their medical status for each data they visited the doctor. The medication for each patient data table stores the medication for each patient and the dosage as well as the issue date. The vaccine table stores the vaccines each patient has and the date they received the dose. The login information stores the user ID and password and whether each ID is a doctor or a patient, as well as the date they joined the system.

## Functionality

Since patient data is private information, we would need to create our own data. We would have tables for patient information, doctor information, appointments, prescriptions, vaccinations and a login information table. The Patient table would have data on the patient such as their name, certain demographic information, and their symptoms. The Doctor table would have their name, demographic information and their specialty. The Appointments table tracks which doctors and patients have had appointments together. The Prescription table would track what patient has the prescription, the medication, dosage, and date the prescription was written. The Vaccine table would have information on a patient, vaccine, and date of vaccination.  The login table would have a username, password, account type, and creation date.

This site would allow patients to view their medical data and history (vaccinations, symptoms, and prescriptions). They can also search through Doctors based on certain parameters, and see a list of results. The application will provide a ranked list of doctors based on their specialities and their history with similar patients. 

A doctor can input data of a patient, thereby inserting a row into the table, and the patient has access to that data. Doctors can also update the records of their own patients, to add new symptoms or other information. They can insert new patients, vaccinations, and prescriptions in their respective tables. Also, doctors can delete prescriptions from that table if they are no longer needed.

A creative component is a vaccine database where we could input vaccine types and dates which patients have received the vaccine. This way we can keep track of who is not up-to-date with vaccinations and integrate an API like Twilio that would email or message them when they are due for their next vaccination.


## UI Mockup

<center>
    <img src = "thumbnail_UI Mock-up-1.jpg" style = "float: left; margin-right; 10px;">
    <figcaption>User Login Page</figccaptoin>
</center>
<br/>
<center>
    <img src = "thumbnail_UI Mock-up-2.jpg" style = "float: left; margin-right; 10px;">
    <figcaption>Patient View</figccaptoin>
</center>
<br/>
<center>
    <img src = "thumbnail_UI Mock-up-2.jpg" style = "float: left; margin-right; 10px;">
    <figcaption>Doctor View</figccaptoin>
</center>

### Doctor Table

| **DoctorID** | FirstName | LastName | Specialty |
|--------------|-----------|----------|-----------|
|      01      |    John   |   Paul   |   ears    |

### Patient Table

| **PatientID** | FirstName | LastName |    Date   | BirthYear | Symptom1 | Symptom2 |
|---------------|-----------|----------|-----------|-----------|----------|----------|
|       472     |    Sam    |   Smith  | 3/12/2021 |    1975   |   True   |   False  |

### Patient/Doctor Appointments Table

| **PatientID** | **DoctorID** | AppointmentHistory |
|---------------|--------------|--------------------|
|               |              |                    |

### Prescriptoin/Medication Table

| **PatientID** | Medication | IssueDate | Dosage |
|---------------|------------|-----------|--------|
|       472     |   Tylenol  | 9/26/2022 |   20   |

### Vaccine Table

| **PatientID** |    VaccineType   |    Date    |
|---------------|------------------|------------|
|      472      | MODERNA COVID-19 | 09/26/2022 |

### Login Table

| **UserID** | FirstName | LastName | UserType | DateCreated | UserName | Password  |
|------------|-----------|----------|----------|-------------|----------|-----------|
|     01     |    John   |   Paul   |  Doctor  | 09/26/2022  |  jpaul1  | cs411FTW! |
|    472     |    Sam    |   Smith  | Patient  | 09/26/2022  |  ssmith4 | @sqlfun32 |

## Work Distribution

- Frontend/UI:
    - Edward (Login implementation and info, buttons, display, data analytics, security like user level access to data)
    - Lilian (UI for Patients and Doctors)
- Backend:
    - Daniel (Tables/Queries for doctors and patients)
    - Sean (Tables/Queries and API integrations)

