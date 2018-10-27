# Readme

# Student Management
This open source project has been created to give education systems an open source solution for student and learning management.

## Getting Started
1. Set up a [Postgresql](https://www.postgresql.org/) DB (Download [here](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads))
2. Create a Database called `student_management`
3. Create a user with the info found in [`./orm/db.js`](https://github.gatech.edu/jtvw3/student-management/blob/master/orm/db.js)
4. `npm install`
5. `npm run`
6. [http://localhost:3000/](http://localhost:3000/)

_Note: The port can be changed through the use of environment variables. Simply set the `PORT` variable._ 

## Contributing
All contributions can be made via Pull Request.

## Technical Notes
This projects uses two main technologies: [Vue.js](https://vuejs.org/) on the front-end and [Node.js](https://nodejs.org/) on the back-end.

### Front-end
The front-end uses Vue.js the majority of the front-end tasks. Because this project will end up being quite large, it will heavily leverage the components and views offered by Vue.

In addition to Vue.js, this project will use [Vuex](https://vuex.vuejs.org/) for state management, [Axios](https://github.com/axios/axios) for HTTP requests, and [Bootstrap Vue](https://bootstrap-vue.js.org/) for styling.

### Back-end
As mentioned, the back-end will use Node.js. Along with that, it will use [Sequelize.js](http://docs.sequelizejs.com/) for managing interactions with the database. This project also uses [Express](http://expressjs.com/) for ease of use with processing HTTP requests.

### Security
This application uses [Okta](https://www.okta.com/) for authentication.
