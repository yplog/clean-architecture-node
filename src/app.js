const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const routes = require('./frameworks/expressSpecific/routes');
const dependencies = require('./config/dependencies');
const ErrorHandler = require('./frameworks/expressSpecific/ErrorHandler');

module.exports = {
    start: () => {
        // Middlewares
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));

        // Routes
        app.use(API_PREFIX, routes(dependencies))

        // Common error handler
        app.use(ErrorHandler);

        app.listen(PORT, () => {
            console.log(`🚀 Server is running under port ${PORT}`);
        });
    }
}