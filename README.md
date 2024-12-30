# Jira Ticket Creation App
This is a simple web application that integrates with Jira's API to create Jira tickets. It allows users to log in with their Jira credentials, input necessary details (project ID, title, description, occurrences), and submit a form to create a ticket.
## Prerequisites

Before starting, ensure the following:
1.	**Jira Account:** Create a Jira account if you don't already have one.
1.	**Jira Project Setup:** Create a Jira project with a custom "Number" field called occurrences, marked as a required field.

## Setup
Follow these steps to set up and run the application locally:

#### 1. Clone the repository
 	git clone <repo-url>

#### 2. Backend
Run the backend server:
python app.py

#### 3. Frontend
1.	Install dependencies:
npm install
2.	Run the React app:
npm start

## Usage
1.	Open the frontend in your browser (http://localhost:3000).
2.	Enter your Jira credentials (jira sever domain, email and API token) in the login form.
3.	After successful login, the UI will prompt you to input:
   a.	Project ID (The project id of the new project you created)
   b.	Title
   c.	Description
   d.	Occurrences
5.	Click the Submit button to create a Jira ticket.
6.	The URL of the newly created ticket will be displayed on the screen

## Screenshots
1.	Login Screen:
<img width="147" alt="image" src="https://github.com/user-attachments/assets/b7608c45-6a69-4419-8f4c-2334be0547d7" />


2.	Ticket Creation Form:
<img width="600" alt="image" src="https://github.com/user-attachments/assets/2b0a31a6-3295-4f4f-9379-2fa68236db65" />

3.	Ticket Created Feedback
<img width="595" alt="image" src="https://github.com/user-attachments/assets/01bdf269-7491-45fe-9ef7-1b147bfb82cb" />
