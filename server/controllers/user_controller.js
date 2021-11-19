import userService from '../service/user_service.js';
import {v4} from 'uuid';
import path from 'path';

const __dirname = path.resolve();


class UserController{
    async registration (req, res, next) {
        try {
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
            console.log(error.message);
        }
    }
    async login(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    async logout(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    async activate(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    async getUser(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

}

export default new UserController()