# MERN Chat Application

A simple real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.io** for real-time communication. Users can sign up, log in, view other users, and chat with them in real time.

## Features

- **User Authentication**: Users can sign up and log in.
- **Real-Time Chat**: Send and receive messages instantly.
- **User List**: View all registered users and start chatting with them.
- **Protected Routes**: Access to the chat functionality and user list is restricted to logged-in users only.

## Technologies Used

- **Frontend**: 
  - React
  - React Router
  - Tailwind CSS (for styling)
  - Recoil (for state management)

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for storing user data)
  - Socket.io (for real-time communication)

- **Authentication**:
  - JWT (JSON Web Tokens) for secure authentication and token management.

## Installation

### Prerequisites

- **Node.js**: Ensure Node.js is installed. Download it from [here](https://nodejs.org/).
- **MongoDB**: Either install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Setup & Run the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ashutosh-Shukla-036/ChatApp.git
   cd ChatApp
   ```

2. **Backend Setup:**

   ```bash
   cd BackEnd
   npm install
   ```

   Create a `.env` file in the `server` directory and add the following environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Frontend Setup:**

   ```bash
   cd ../FrontEnd
   npm install
   ```

4. **Run the project:**

   - To run the **backend** server:

     ```bash
     cd BackEnd
     npm start
     ```

   - To run the **frontend** React app:

     ```bash
     cd ../FrontEnd
     npm start
     ```

   The backend will be running on `http://localhost:5000` and the frontend on `http://localhost:3000`.
