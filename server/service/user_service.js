import {User} from '../models/models.js';
import bcrypt from 'bcrypt';
import TokenService from './token_service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from "../exceptions/api-error.js";

class UserService {
    async registration(userData) {
        const candidate = await User.findOne({where: {email: userData.email}});
        if (candidate) {
            throw new ApiError.BadRequest(`User with mail ${userData.email} already exists`);
        }
        userData.password = await bcrypt.hash(userData.password, 3);
        const user = await User.create({...userData})

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

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
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, ...user.dataValues}
    }

    async logout(refreshToken) {
        return await TokenService.deleteToken(refreshToken);
    }
}
export default new UserService()
