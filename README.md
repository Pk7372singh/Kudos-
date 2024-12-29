
# KudoSpot

KudoSpot is a web application that allows users to recognize and appreciate their colleagues by sending kudos. The application includes login functionality, a dashboard for managing kudos, and a page to give kudos to others.

## Features

- **Login Page:** Users can log in using their email address.
- **Dashboard:** After logging in, users can view and manage their received kudos.
- **Give Kudos:** Users can send kudos to their colleagues.
- **Navigation:** A navigation bar allows users to switch between different pages (Dashboard, Give Kudos).

## Technologies Used

- **React.js**: Frontend framework for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Fetch API**: Used for making HTTP requests to the backend.
- **Express.js**: Server-side framework (for API handling).
- **Node.js**: JavaScript runtime for the backend.
- **MongoDB**: NoSQL database for storing user data and kudos.
- **JWT (JSON Web Tokens)**: For handling authentication.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kudospot.git
   cd kudospot
   ```

2. Install dependencies:

   For frontend:

   ```bash
   cd frontend
   npm install
   ```

   For backend:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend folder and add the following:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   cd backend
   npm start
   ```

5. Start the frontend server:

   ```bash
   cd frontend
   npm start
   ```

6. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Folder Structure

```
kudospot/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   ├── package.json
└── README.md
```

