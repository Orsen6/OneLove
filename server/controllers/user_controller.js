import userService from '../service/user_service.js';
import MailService from '../service/mail_service.js';
import {v4} from 'uuid';
import path from 'path';
import {validationResult} from "express-validator";
import ApiError from '../exceptions/api-error.js';
import {User, Token} from '../models/models.js';

const __dirname = path.resolve();


class UserController{
    async registration (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {email, password, name, surname, age, gender, summary} = req.body;
            let imageName = null
            if (req.files) {
                const {image} = req.files;
                imageName = v4() + ".jpg";
                console.log(imageName)
                await image.mv(path.resolve(__dirname, 'static', imageName));
            }
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
            return res.json({status: true, userData});
        } catch (error) {
            next(error);
        }
    }
    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json('200');
        } catch (error) {
            next(error);
        }
    }

    async changePass(req, res, next) {
        try {
            const errors = validationResult(req);
            const {newPass} = req.body;
            console.log(newPass)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const link = req.params.link;
            await userService.changePass(newPass, link);
            return res.json('Password successfully changed');
        } catch (error) {
            next(error);
        }
    }

    async sendMail(req, res, next) {
        try{
            const link = v4();
            const {email} = req.body;
            const user = await User.findOne({where: {email: email}});
            user.passLink = link;
            await user.save();
            await MailService.sendChangePassMail(email, `${process.env.API_URL}api/change-pass/${link}`);
            return res.json(email);
        } catch(error){
            next(error);
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }
    async getUser(req, res, next) {
        try {
            if (!req.cookies.refreshToken){
                return next(ApiError.UnauthorizedError());
            }
           const tokenData = await Token.findOne({where: {refreshToken: req.cookies.refreshToken}});
           const userData = await User.findByPk(tokenData.userId);
           return res.json({status: true, userData});
        } catch (error) {
            next(error);
        }
    }

}

export default new UserController()