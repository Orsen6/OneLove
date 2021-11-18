import {User} from '../models/models.js';
import bcrypt from 'bcrypt';
import TokenService from './token_service.js';
import UserDto from '../dtos/user-dto.js';

class UserService {
    async registration(userData) {
        const candidate = await User.findOne({where: {email: userData.email}});
        if (candidate) {
            throw new Error(`user with mail ${userData.email} already exists`);
        }
        userData.password = await bcrypt.hash(userData.password, 3);
        const user = await User.create({...userData})

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto }
    }
}
export default new UserService()
