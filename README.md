#News Explorer Backend

Welcome to the News Explorer Backend repository! This repository contains the server-side code for the News Explorer application, which allows users to explore and save news articles from various sources.

##Installation
To run the server locally on your machine, please follow the instructions below:

Make sure you have Node.js installed on your system.

Clone this repository to your local machine using the following command:

git clone https://github.com/daniel-malka/news-explorer-backend.git
Navigate to the project directory:

cd news-explorer-backend
Install the dependencies using npm:

npm install
Start the server by running the following command:

npm run start
This will start the server on http://localhost:3001.

Alternatively, if you want to run the server in development mode with auto-reloading using nodemon, you can use the following command:

npm run dev

This will start the server in development mode.

##File Structure
The project's file structure is organized as follows:

news-explorer-backend/
├── controllers/ # Contains the route controllers
├── middlewares/ # Contains the custom middleware functions
├── models/ # Contains the database models
├── routes/ # Contains the API route definitions
├── utils/ # Contains utility functions and modules
├── app.js # Main application file
└── ...
#News Explorer Backend

Welcome to the News Explorer Backend repository! This repository contains the server-side code for the News Explorer application, which allows users to explore and save news articles from various sources.

Installation
To run the server locally on your machine, follow the instructions below:

Make sure you have Node.js installed on your system.
Clone this repository to your local machine using the command: git clone https://github.com/daniel-malka/news-explorer-backend.git
Navigate to the project directory: cd news-explorer-backend
Install the dependencies using npm: npm install
Start the server by running the command: npm run start. This will start the server on http://localhost:3001.
Alternatively, you can run the server in development mode with auto-reloading using nodemon by using the command: npm run dev.
File Structure
The project's file structure is organized as follows:

graphql
Copy code
news-explorer-backend/
├── controllers/     # Contains the route controllers
├── middlewares/     # Contains the custom middleware functions
├── models/          # Contains the database models
├── routes/          # Contains the API route definitions
├── utils/           # Contains utility functions and modules
├── app.js           # Main application file
└── ...
API Endpoints
The following are the API endpoints available in this server:

POST /signup: Create a new user account.
POST /signin: Authenticate a user and generate an access token.
GET /articles: Get all saved articles associated with the authenticated user.
POST /articles: Save a new article.
DELETE /articles/:articleId: Delete a saved article with the specified ID.
GET /users/me: Get the current user's information.
For detailed information on the request and response formats of each endpoint, please refer to the documentation or the corresponding route controller files.

Technologies Used
The News Explorer Backend server utilizes the following technologies and libraries:

Node.js: A JavaScript runtime environment.
Express.js: A fast and minimalist web application framework for Node.js.
MongoDB: A NoSQL document database for data storage.
Mongoose: An elegant MongoDB object modeling for Node.js.
jsonwebtoken: A library for generating and verifying JSON Web Tokens (JWT).
bcrypt.js: A library for hashing and comparing passwords.
dotenv: A module for loading environment variables from a .env file.
cors: A middleware for enabling Cross-Origin Resource Sharing (CORS) in the server.
helmet: A middleware for setting security-related headers.
Nginx: A reverse Proxy service running on VM.
PM2: A process manager that will keep the server up and running permanently.
Server Availability
The News Explorer Backend server is permanently running and accessible at the following URL:

Production Server: api.news-expo.mooo.com

You can make API requests to the above URL to interact with the server and access its functionalities. Please refer to the API endpoints mentioned earlier for the available routes and their corresponding HTTP methods.

Feel free to explore the server and leverage its capabilities for building your own News Explorer application.

If you have any questions or need further assistance, please don't hesitate to reach out. Happy exploring!


