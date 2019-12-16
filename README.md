# FS React Base
![Status](https://img.shields.io/badge/STATUS-IN--PROGRESS-red)

![DB Sequelize](https://img.shields.io/badge/DB-SEQUELIZE-blue)
![AUTH Passport](https://img.shields.io/badge/USER_AUTH-PASSPORT-green)
![PWA NO](https://img.shields.io/badge/PWA-NO-orange)

This Branch contains the starter files for a Full-Stack React Web App that uses Sequelize for database management and Passport for user authentication.

## Set Up
Clone this repo to your machine. Then, go into the following files and make the necessary changes to match your database/models:

`package.json:ln2`
> Update the name of your app

`server/models`
> Set up your models to match your tables

`server/lib/algorithm.js`
> Add any functions or code in here that you need to use on your backend that aren't model/controller related

`server/db/schema.sql`
> Update the name of the database you are using in here, then run it to create that database on your machine

`server/controllers`
> Update your controllers to reflect your models

`server/controllers/index.js`
> Update your routes and their url paths to match the controllers

`server/config/config.json`
> Update your username, password, database, and host names for development, test, and production

Then set up the rest of your project as you like!