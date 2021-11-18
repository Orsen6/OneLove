import userService from '../service/user_service.js';


class UserController{
    async registration (req, res, next) {
        try {
            const {email, password, name, surname, age, gender, image, summary} = req.body;
            const userData = await userService.registration({email, password, name, surname, age, gender, image, summary});
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