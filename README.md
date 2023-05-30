## ID: 00013400

# Github:: 
https://github.com/ID-00013400/web_ref

# Glitch:
https://soft-noble-quesadilla.glitch.me/

# About app

A money app has been developed where users can establish different categories and enter their purchases along with the name of the purchase, the date it was made, and the cost

# Steps to run app:

* inside project folder run: npm install
* in order to run app with nodemon run: npm run serve
* in order to run app with node run: node app

#   Project Structure

During the project's development, it was decided to separate the logic of the code into several folders in order to maintain the code clean and to simplify code maintenance.


* app.js - main js file where app runs data - storage of json files that are performing roles of database managers - folder of managers that contains general logic. Within the managers folder, there is a DataManager file that exports a class with methods for managing data in json files. The following methods are included: getAll, find, insert, update, and remove.
* public - a folder for public files such as photos, javascript scripts, and style files.
* routers - a folder for storing application route files. Route files: expenditures and classifications
* validation - files in the validation folder output validation rules for saving user data views - folder contains all application views