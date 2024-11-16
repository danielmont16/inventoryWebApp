# Documentation

### Description

- Full CRUD application with both local authentication and OAuth authentication.
- It has been written using the following tools:
    - NodeJs version 20.18.0
    - Express
    - Passport
    - Handlebars template engine
    - MongoDB

### Part 1 Setup instructions

- Clone this repository
- In the main root, create a .env file and provide the following information:
    DB_CONNECT=<connection with database>
    GITHUB_CLIENT_ID=<your client Id>
    GITHUB_CLIENT_SECRET=<your client Secret>
    GITHUB_CALLBACK_URL=<your callback url>
    GOOGLE_CLIENT_ID=<your client Id>
    GOOGLE_CLIENT_SECRET=<your client secrert>
    GOOGLE_CALLBACK_URL=<your callback url>
- Run npm i
- Run npm start

### Part 2 Routes

- routes/Index.js
    - This route handles with all the authentication and the main routing strategy.
    - This route will display the entry-point for the user, which has to log in either locally or using GitHub/Google to modify information.
   
- routes/products.js
   - This route handles all the CRUD operations with the DataBase.
   - To perform all the operations, the following Mongoose methods were used. save(), .find(), .findByIdAndUpdate(), and .findByIdAndDelete().

### Part 2 Access Control

- The application allows the user to log in either using their GitHub/Google account or locally.
- If the user is not logged in, the information will be displayed in read mode.
- If the user is logged in, the information would be displayed in edit mode. Thus, the user could create, read, update, edit, and delete data.
- To handle the authentication part, either local or with third parties, the web application uses the passport module. Also, the passport-github2 and passport-google-oauth2 modules are required.



