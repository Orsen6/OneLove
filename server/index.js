import express from 'express';
import {} from 'dotenv/config';
import sequelize from './db.js';
import models from './models/models.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import router from './router/index.js';
import errorMiddleware from './middlewares/error-middleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`hello form ${PORT}`));
    } catch (error) {
        
    }
}

start()