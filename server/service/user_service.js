import {User} from '../models/models.js';
import bcrypt from 'bcrypt';
import tokenService from './token_service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(userData) {
        const candidate = await User.findOne({where: {email: userData.email}});
        if (candidate) {
            throw ApiError.BadRequest(`User with mail ${userData.email} already exists`);
        }
        userData.password = await bcrypt.hash(userData.password, 3);
        const user = await User.create({...userData})

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto }
    }

    async login(email, password) {
        const user = await User.findOne({where: {email: email}})
        if (!user) {
            throw ApiError.BadRequest('User not found with this e-mail');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, ...userDto}
    }

    async logout(refreshToken) {
        return await tokenService.deleteToken(refreshToken);
    }

    async refresh(refreshToken){
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validationRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);

        if (!userData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findByPk(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async getUserData(userId){
        const userData = await User.findByPk(userId);
        return userData;
    }

    async changePass(newUserPass, link){
        const user = await User.findOne({where:{passLink: link}});
        user.password = await bcrypt.hash(newUserPass, 3);
        user.passLink = null;
        await user.save();

    }
}
export default new UserService()
