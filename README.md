# MailServer#   M a i l 
 
 This Mail Server is built using the MERN (MongoDB, Express, React, Node.js) stack, integrated with IMAP (Internet Message Access Protocol) and SMTP (Simple Mail Transfer Protocol) to handle email operations.

The server allows users to send and fetch emails, manage inboxes, move emails to the bin, and mark emails as starred.

Technologies Used
MongoDB - For database management
Express - For API routing
React - Frontend for the client-side email interface
Node.js - Server-side JavaScript runtime
IMAP - Fetch emails from the mailbox
SMTP - Send emails through the server
Setup Instructions
1. Prerequisites
Make sure you have the following installed:

Node.js (v14 or later) 
MongoDB - For local development, you can download and run MongoDB locally, or use MongoDB Atlas.
Nodemon (optional for automatic server restart): Install it globally using npm install -g nodemon.
2. Clone the Repository
Clone the project repository to your local machine:
git clone https://github.com/snehasingh53/Mail


3. Install Dependencies
    (i) For frontend
        npm i  to install dependencies
        npm run dev    to start
     (ii) for Backend
        npm i     to install dependenices
       npm start     to start the server



Implementation Description
This project is a mail server and client application built using the MERN stack (MongoDB, Express, React, Node.js), which supports IMAP for fetching received emails and SMTP for sending emails. The system is structured into several key parts, including backend email handling, frontend user interface, and user authentication.

Database Collections
User Collection (user.js):

This collection stores user data for authentication purposes. It is used for login and signup functionalities.
Each user has a unique email and password, which are stored in the database securely (passwords should be hashed before saving).
Example Fields:
email: User’s email address.
password: Hashed password for security.
Email Collection (email.js):

This collection is used to store emails that the user has sent via SMTP.
It stores metadata about each email, such as:
to: Recipient’s email address.
from: Sender’s email address.
subject: Email subject.
body: Email content.
sentDate: Date and time the email was sent.
starred: Boolean flag indicating if the email is starred.
bin: Boolean flag indicating if the email is in the bin.
FetchedEmails Collection (fetchedEmails.js):

This collection stores emails fetched from the user’s inbox via IMAP. It’s updated regularly to keep the inbox in sync.
Each document stores details about an email retrieved via IMAP:
from: Sender’s email address.
to: Recipient’s email address.
subject: Email subject.
body: Email body content (can be plain text or HTML).
receivedDate: Date and time the email was received.
starred: Boolean flag indicating if the email is starred.
bin: Boolean flag indicating if the email is in the bin.
type: The type of email, e.g., inbox, starred, bin, etc.
Frontend
The frontend of the application is created using React and includes the following features:

Home Page:

The home page is the initial screen where users can either login or signup.
Login Credentials for Testing:
Email: ssnehasingh53@bbdnitm.ac.in
Password: 1234567890
The user will enter the login credentials, and upon successful authentication, they are redirected to the landing page.
Landing Page:

After logging in, the user is directed to the landing page, which features a constant Header and Sidebar on the screen.
The Sidebar allows the user to navigate between different email categories, such as:
Inbox: View received emails fetched via IMAP.
Sent: View emails the user has sent.
Starred: View emails marked as starred.
Bin: View emails that have been moved to the bin.
All Mail: View all emails, regardless of status.
The content area on the page dynamically changes based on the selected category, displaying the relevant emails.
Account Circle for Logout:

In the header, there is an Account Circle icon, representing the user’s account.
Upon clicking the icon, a dropdown menu appears with a Logout option. When the user clicks Logout, they are logged out and redirected to the login/signup page.
Backend (Node.js / Express)
The backend is built using Node.js and Express. It interacts with the MongoDB database to manage user accounts and emails, using the following key components:

User Authentication:

The backend provides endpoints for signup and login. User credentials are verified, and tokens (JWT) are generated for session management after successful login.
POST /signup: User signup endpoint.
POST /login: User login endpoint.
IMAP for Fetching Emails:

The backend uses IMAP to connect to the email server and fetch received emails, storing them in the FetchedEmails collection.
The emailService.js file is responsible for interacting with the IMAP server, fetching emails, and saving them to the database.
SMTP for Sending Emails:

The backend also allows the user to send emails using SMTP, leveraging the nodemailer library for email composition and sending.
The Email.js collection stores the sent email data.
Email Retrieval:

The backend provides endpoints to retrieve emails from the FetchedEmails and Email collections.
Emails can be retrieved based on their status, such as inbox, starred, bin, or sent.
Functionality Overview
User Login/Signup:

Users can either sign up or log in using their email and password. Once authenticated, the user is redirected to the landing page where they can access their inbox and other email features.
Email Categories:

The user can view emails based on different categories, such as inbox, sent, starred, bin, etc.
The inbox is populated with emails fetched via IMAP, and sent emails are stored and displayed from the Email.js collection.
Starred and Bin Management:

Users can mark emails as starred or move them to the bin.
The state of the emails (starred, bin, etc.) is updated in the MongoDB database.
Logout:

The user can log out by clicking the account icon in the header and selecting Logout from the dropdown menu.


Conclusion
This mail server and client application integrates IMAP for receiving emails and SMTP for sending emails. The MERN stack is utilized to build the system, with MongoDB storing email and user data. The frontend allows users to manage their emails dynamically through an interactive interface, and the backend handles email fetching, sending, and user authentication seamlessly.
  
 

