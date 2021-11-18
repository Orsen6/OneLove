import express from 'express';
import {} from 'dotenv/config';
import sequelize from './db.js';
import models from './models/models.js';

const app = express();
const PORT = process.env.PORT || 5000;


const start = async () => {
    try {
        sequelize.authenticate();
        sequelize.sync();
        app.listen(PORT, () => console.log(`hello form ${PORT}`));
    } catch (error) {
        
    }
}

start()