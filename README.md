# MyContact-App - Full Stack Contact Manager

Welcome to **MyContact-App**, a full-stack contact management system where users can securely manage their contacts with features like authentication and CRUD operations. This app is built using **Node.js**, **Express.js**, **MongoDB**, and **JWT** for the backend, while the frontend utilizes **HTML**, **CSS**, **JavaScript**, and **Tailwind CSS** for a responsive UI. 

The application is deployed with **Render** (for backend) and **Netlify** (for frontend).

### Live Demo
You can access the UI hosted on **Netlify**:
[MyContact-App UI](https://mycontactappdev.netlify.app/)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup-and-installation)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Flow & Functionality](#flow-and-functionality)
- [Contributing](#contributing)
- [License](#license)

## Overview

**MyContact-App** is a contact manager application designed to help users store, update, and delete contact details securely. It features user authentication (login/signup) and an easy-to-use interface that allows CRUD operations for contacts.

- **Backend**: Built with **Node.js** and **Express.js**, utilizing **MongoDB** for data storage and **JWT** for secure authentication.
- **Frontend**: Built using **HTML**, **CSS**, and **JavaScript**. **Tailwind CSS** ensures a clean and responsive design.

## Features

- **User Authentication**: Users can sign up and log in with email and password. Authentication tokens (JWT) are used for secure access.
- **CRUD Operations**: Users can add, view, update, and delete contacts.
- **Responsive UI**: Built with **Tailwind CSS** to ensure a mobile-first, responsive user experience.
- **Error Handling**: Informative error messages are shown for missing data, authentication errors, and server issues.

## Tech Stack

### Frontend:
- **HTML**, **CSS**, **JavaScript**
- **Tailwind CSS** for styling

### Backend:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for database management
- **JWT (JSON Web Tokens)** for secure user authentication
- **Bcrypt.js** for password hashing

### Tools & Services:
- **Render** for backend deployment
- **Netlify** for frontend deployment
- **Nodemon** for local development

## Setup and Installation

### 1. Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/yourusername/mycontact-app.git
cd mycontact-app
