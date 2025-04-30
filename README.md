# EV Courier Service - MERN Project

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![EV Vehicles](https://img.shields.io/badge/EV-Vehicles-green)
![Role Based Auth](https://img.shields.io/badge/Auth-Role%20Based-orange)

## Project Overview

EV Courier Service is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) designed to streamline courier services in Sri Lanka using Electric Vehicles (EVs). The platform offers a modern, eco-friendly solution for parcel delivery with features tailored for both users and admins.

## Features

### User-Side Features
- **Role-Based Authentication**: Secure login and registration with distinct roles for users and admins
- **Order Placement**: Users can place delivery orders with real-time estimated bill calculations
- **Email Billing**: Automated email notifications with detailed billing information
- **User Information Management**: Manage profiles, personal details, and order history
- **Payment Integration**: Secure payment processing for seamless transactions
- **Loyalty Management**: Reward system for frequent users with loyalty points and discounts

### Admin-Side Features
- **Delivery Personnel Assignment**: Assign delivery personnel to orders
- **Route Optimization**: Find efficient delivery routes across Sri Lanka
- **Order Management**: Monitor and manage all orders from a centralized dashboard
- **Analytics Dashboard**: View insights on orders, deliveries, and user activity

## Tech Stack
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer
- **Route Optimization**: Google Maps API
- **Payment Gateway**: Stripe or PayPal
- **Deployment**: Vercel (Frontend), Heroku/AWS (Backend)

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm (Node Package Manager)
- Git

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ev-courier-service.git
cd ev-courier-service
```

### 2.  Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3.  Backend Setup
```bash
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
EMAIL_USER=your-email-service-user
EMAIL_PASS=your-email-service-password
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

### 4.  Backend Setup
```bash
cd ../backend
npm install
npm run dev
```


### 5.  Project Structure
```bash
ev-courier-service/
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components
│   │   ├── App.js             # Main App component
│   │   └── index.js           # Entry point
├── backend/                    # Node.js/Express backend
│   ├── routes/                # API routes
│   ├── models/                # MongoDB schemas
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Authentication
│   └── server.js              # Entry point
├── README.md                  # Project documentation
└── .gitignore                 # Git ignore file
```

