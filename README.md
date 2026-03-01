Smart India Hackathon 2025 Portal – Frontend
Overview

This project is a complete frontend implementation of a Smart India Hackathon (SIH) 2025 Portal built using React.js.

It replicates the workflow and structure of the official SIH platform, including problem browsing, detailed problem view, team application submission, file validation, and confirmation handling.

The project demonstrates structured component architecture, dynamic routing, form validation, state management, and professional UI implementation using React.

Key Features
Problem Statements Module

Displays multiple problem statements

Dynamic routing for individual problem details

Detailed view with organization, category, theme, and deadline

Apply button redirects to the application form

Application System

Team-based application submission

Maximum 5 members allowed

All fields required validation

Abstract submission (up to 5000 words)

PPT upload validation (.ppt / .pptx only)

Submit button disabled until form is valid

Data passed to confirmation page via route state

Confirmation Page

Displays submitted team member details

Displays abstract

Clean success confirmation UI

UI & Design

Government-style professional layout

Clean header and footer structure

Horizontal theme slider with navigation arrows

Responsive design

Structured card-based layout

Technology Stack

Frontend

React.js

React Router DOM

JavaScript (ES6)

CSS3

Version Control

Git

GitHub

Project Architecture

src/

components/

layout/

Header.jsx

Footer.jsx

ThemeCard.jsx

pages/

Home.jsx

Login.jsx

ProblemStatements.jsx

ProblemDetails.jsx

Application.jsx

Confirmation.jsx

sections/

AboutSection.jsx

GuidelinesSection.jsx

FAQSection.jsx

ContactSection.jsx

data/

problemData.js

images/

sih.png

App.js
index.js

Application Workflow

User navigates to Problem Statements.

User selects a specific problem.

User clicks Apply.

User fills team details.

User uploads PPT file.

User submits application.

User is redirected to confirmation page displaying submitted data.

Form Validation Rules

Only Team Leader is allowed to apply.

Maximum 5 team members allowed.

All member fields are mandatory.

Abstract field must not be empty.

PPT file must be .ppt or .pptx format.

Submit button remains disabled until validation passes.

Installation and Setup
Step 1: Clone the repository

git clone https://github.com/your-username/Sih_react.git

Step 2: Navigate to project directory

cd Sih_react

Step 3: Install dependencies

npm install

Step 4: Run development server

npm start

The application will run at:

http://localhost:3000

Development Notes

React Router DOM is used for navigation and dynamic routing.

State is managed using React Hooks.

Route state is used to transfer data between Application and Confirmation pages.

The project follows modular component architecture for scalability.

Future Improvements

Backend integration (Node.js / Express / Firebase)

Database integration for persistent storage

Authentication and authorization system

Admin dashboard for problem management

Cloud deployment (Vercel / Netlify / AWS)

API-based dynamic problem loading
