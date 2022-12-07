# Report

## Changes in Project

We mentioned that patients would be able to see what vaccinations they are overdue for, but we ended up giving this functionality to doctors. It’s a pretty minor change.

We decided to exclude login information from the final version of the project, because we felt like it wasn’t as important for the purposes of this class. Other than that we for the most part stuck to the original schema we had drafted.

Our UI ended up being significantly different from our mockup. This was mostly done out of practicality, since we prioritized ease of implementation when making the final version of the page layout, and we didn’t know what would be easy to do when making the mockup. Tying in with the earlier point, we chose not to include the login page, although we have a simpler version of it where you choose between the doctor and patient version of the website.

We added a symptoms table, so that we could store past sets of symptoms for patients. This serves as a way of knowing their medical history and is used to help us understand what sorts of patients doctors have worked with in the past.

## Application Usefulness

Our application achieved a model of what a real world application might do. However, it doesn’t take into account many complexities of real world medicine that would need to be factored in. We would need logins and greater privacy control, and many of our queries would need to take more advanced data into account. Our vaccine query, for instance, would need to take into account that some vaccines only need 1 dose, or that vaccines have varying amounts of time before an additional dose is needed. Our trigger would probably be best with some manual verification from the doctor, and our stored procedure doesn’t consider that patients might need refills on multiple prescriptions. However, it does achieve a good framework that can be expanded on to account for all the nuances of medicine.

## Changes in Schema

We changed the schema significantly from our original proposal. We added a symptoms table in order to track past symptoms for patients and removed the login table because it wasn’t a priority. We also made some smaller. changes, like adding a “date” field to the appointments table in the place of “appointment history”.

From the beginning, we expected that we would need to mock up the data, since medical data is private and would be hard to obtain. We did end up using mock data, so nothing changed throughout this process.

## Changes to ER and Tables

As mentioned above, we did away with the login table. Other than that, the tables and the relationships between them stayed the same. The only difference is that “date” became a primary key in the Appointments table, because we wanted to be able to keep track of multiple appointments between a patient and a doctor, which we think is definitely a positive change. The login table would be suitable for a fully functional final product, but it was beyond the scope of this class.

## Added and Removed Functionalities

The only functionalities we removed from our initial proposal were logging in (for reasons detailed above) and the ability for patients to see what vaccinations they are overdue for. We ended up moving this functionality over to doctors because we thought it was more interesting as a tool for them, allowing doctors to keep track of where their patients are at and make recommendations.

We added functionality allowing doctors to automatically refill prescriptions for their patients. This seemed like an interesting functionality that presented us with a tough implementation challenge. Refilling prescriptions is also something that doctors do very often, but it’s also simple and repetitive, so giving them a way to do it at the press of a button seemed like a good functionality to provide them with.

We also added functionality to automatically create entries in prescriptions when patients are reported as having certain symptoms. Obviously this would need manual review in the real world, but this is another thing that could help significantly with handling menial tasks.

## Advanced Database Programs

We made use of a trigger to enable us to auto-prescribe medication that is linked to certain symptoms. For example, if a patient experiences pain like a stomach ache or back pain the database automatically inserts a new prescription for ibuprofen(painkiller) as we know the patient will need medication for pain relief. This can be extended to other common medication prescribed for common illnesses and symptoms. Another advanced program we implemented was to help doctors update old prescriptions with a press of a button when viewing a patient profile.

## Technical Challenges

We had developed our website through the Google Cloud Platform which only gave us a terminal to code in initially. This made development difficult as we had to use vim or nano to program the website with editing conflicts when trying to write to a program. We ended up downloading and uploading the files that we programmed from the SSH instance of our GCP VM to our local machines to edit on VSCode.

We were all not familiar with js, so it took some time to understand why certain functionality was not working. When we implemented the table, we did not want to use a button and without a button we could not use a ‘POST’ and redirect to a page with the table loaded we instead wanted the table to load in with the initial page. It took us some time to understand how to implement this with a ‘GET’ and even the first implementation caused some issues with the other functionality of the website as it was overwriting some variables needed for the other queries.

The initial database design was a bit challenging as it was hard to find medical databases that were suited for our needs. Instead, we ended up using mockaroo.com to help us generate random entries for our database tables.

One rather specific problem that we ran into was that we didn’t know where to put the trigger and stored procedure, or more accurately how to enter them into the database we had already created and were running on GCP. It confused us for a bit, but eventually we talked to a TA and he helped us. We ended up using MySQL Workbench, connecting to the database and running the code to create them through there.

## Other Changes

We did not end up giving privileges to each doctor based on the patient doctor relationship. Meaning that any doctor could view and edit any patient even if it is not theirs.

## Future Work

As mentioned before, there is a lack of privacy with each patient’s data, so including some sort of login table would be useful in order to provide some level of security to one’s data.

Our auto-prescription and prescription updating could be refined to accommodate more medications and symptoms/illnesses. Our update medication could be changed to let doctors select which medication they would like to update instead of updating all of them.

The original idea that started this project was to enable patients and doctors to stay on top of their vaccinations, so integrating a messaging service/email messaging like twilio or mailchimp would go a long way in informing people that their vaccinations are overdue.

## Division of Labor

Much of the database design was done by Sean and Lilian, Daniel worked on the database analysis, and Edward worked much of the frontend and backend of the website. Overall, every team member helped at every stage of the project.

## Demo Video

Video Link: 
