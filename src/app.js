const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const routes = require('./frameworks/expressSpecific/routes');
const dependencies = require('./config/dependencies');
const ErrorHandler = require('./frameworks/expressSpecific/ErrorHandler');

const { connect: connectToMongo } = require('./frameworks/database/mongo')

module.exports = {
    start: () => {
        app.use(express.json());
        app.use(express.urlencoded({
            extended: true
        }));

        app.use(API_PREFIX, routes(dependencies))

        app.use(ErrorHandler);

        app.listen(PORT, () => {
            console.log(`🚀 Server is running under port ${PORT}`);
            connectToMongo();
        });
    }
}