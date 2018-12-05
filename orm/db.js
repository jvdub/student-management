const Sequelize  = require('sequelize');
let sqlz = null;

if (process.env.DATABASE_URL) {
    sqlz = new Sequelize(process.env.DATABASE_URL, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
    });
} else {
    sqlz = new Sequelize('student_management', 'studentManagementUser', 'ManagingStudents', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        operatorsAliases: false
    });
}

sqlz.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sqlz;
