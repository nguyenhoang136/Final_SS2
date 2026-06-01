# Budget Tracking App for Students

## Overview

Budget Tracking App for Students is a full-stack web application designed to help students manage their personal finances efficiently. The system allows users to track income and expenses, manage budgets, visualize spending patterns through charts, export reports to Excel, and receive financial assistance from an AI chatbot.

## Features

* User Registration and Login
* JWT Authentication
* Dashboard Analytics
* Income Management
* Expense Management
* Budget Tracking
* Notifications
* Export Transactions to Excel
* AI Chatbot Support
* Responsive User Interface

## Technologies

### Frontend

* ReactJS
* Vite
* Axios
* React Router DOM
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_ai_api_key
```

Start backend server:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

Backend will run on:

```txt
http://localhost:4000
```

## Team Members

* Nguyễn Văn Hoàng
* Bùi Minh Thái
* Nguyễn Văn Bắc

## Project Structure

```txt
frontend/
backend/
```

## Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas
