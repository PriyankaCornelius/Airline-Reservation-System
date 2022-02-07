# Airline Reservation Application

## Abstract

Airline Reservation Application is a web based airline booking solution that provides a platform for airlines to post their inventory, rates, deals etc. that customers can browse through and perform transactions to make or update reservations. The system also features a Mileage Plus account that keeps track of trips taken in the past and adds Mileage credits that can be encashed as discounts in the future trips. The goal of this project is to build a reliant and fault tolerant system for smooth business operations. The application has two personas,
* **Customer:** Customers can create their own profile, browse through airlines using filters available for dates, one-way/round-trip, ecomony/economy+/business/first class. They can visit the airline profile, add seat selections, make payments and generate tickets, view their previous reservations and invoices, update or cancel their reservation. They can encash discounts from their Mileage Plus account credits or use these credits for payment instead of Credit/Debit cards. 
* **Airline Employee:** Airline Employees can create their own profile, post flight inventory details, add or update flight information, and make flight reservations on behalf of a customer.

# Tools and Languages

<li> Frontend - ReactJS
<li> Backend - Nodejs Express
<li> Database – MySQL
<li> UI Icons – MaterialUI and CSS
<li> Postman - REST API client to test the developed APIs
<li> Deployment - Amazon Web Services (AWS)

<br/> 
<br/>

# Design Decisions

## Architecture-level:

<li>ReactJS as Frontend and NodeJS as Backend
<li>AWS as the cloud provider for deployment
   
### System Architecture
![Architecture Diagram](/Project_Documentation/Screenshots/diagram.png)
   
### Database Design
![Database Design Diagram](/Project_Documentation/Screenshots/databasedesign.png)

## Business-level:

User Features:

<ul><li>Register to Mileage Plus
<li>Login
<li>View and Update Profile
<li>Browse and Search Flights
<li>Book a Flight
<li>Purchase a seat
<li>Make payments using credit card or mileage credits
<li>Generate and download travel ticket
<li>Change/cancel Reservations
</ul>

Employee Features:

<ul><li>Register to Mileage Plus
<li>Login
<li>View and Update Profile
<li>Browse and Search Flights
<li>Add and Update Flights
<li>Cancel Flights
<li>Book a Flight
<li>Purchase a seat 
<li>Change/cancel Reservations

# Scrum meetings schedule

Every Monday

# XP Core Values Implemented

<li> Communication: Our team communicated with each other regularly and Scrum meetings were held every Monday. We discussed about the dependency, issues faced and provide constructive feedback to each other which helped to progress with the project. We used to JIRA to track progress of the sprints. </li>
<li> Simplicity: We implemented the essential and required tasks in the project.</li>
<li> Feedback: Each team member provided constructive feedback on the work performed and ensured that the feedback was implemented in the next sprint. </li>
<li> Courage: We had the courage to incorporate any additional details/tasks that were required for the project progress. </li>
<li> Respect: Each team member respected each other’s decisions and timelines. </li>

# ScrumBoard
https://github.com/gopinathsjsu/team-project-spartans-1/blob/main/Project_Documentation/Screenshots/Scrum%20Board.pdf

# TaskSheet and burndown Chart
https://github.com/gopinathsjsu/team-project-spartans-1/blob/main/Project_Documentation/Screenshots/202SprintSheet.xlsx

# Project Journal
https://github.com/gopinathsjsu/team-project-spartans-1/tree/main/Project_Documentation/ProjectJournal

# EC2 deployment with Load Balancer  
https://github.com/gopinathsjsu/team-project-spartans-1/blob/main/Project_Documentation/Screenshots/EC2%20Deployment.pdf

# Steps to run the application

Root folder

1. Clone the entire respoitory on machine that has nodejs installed on it.

<br/>

Backend

1. Open terminal in the Backend folder and execute "npm i" to install all the backend dependencies.
2. Locate index.js file and update the frontend server's IP address and port number.
3. Update the config.js file in Backend/store with the MySQL connection string
4. run "node index.js" to run the backend server.

<br/>

Frontend

1. Open terminal in the frontend folder and execute "npm i" to install all the frontend dependencies.
2. Locate the Constants.js file in src folder and update the backend server's IP address and port number.
3. run "npm start" to run the application.
   <br/>
<br/>
Open the browser and navigate to server's IP address with port number to find the landing page of the application.

<br/>
<br/>
