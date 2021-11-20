import userService from '../service/user_service.js';
import {v4} from 'uuid';
import path from 'path';
import {validationResult} from "express-validator";
import ApiError from '../exceptions/api-error.js';

const __dirname = path.resolve();


class UserController{
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {email, password, name, surname, age, gender, summary} = req.body;
            const {image} = req.files;

            let imageName = v4() + ".jpg";
            await image.mv(path.resolve(__dirname, 'static', imageName));
            const userData = await userService.registration(
                {email, password, name, surname, age, gender, image: imageName, summary}
            );
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async activate(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    }

}

export default new UserController()