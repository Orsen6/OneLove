import jwt from 'jsonwebtoken';
import {Token} from '../models/models.js';

class TokenService {
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken){
        const tokenData = await Token.findOne({where:{id: userId}});
        if  (tokenData) {
            tokenData.refreshToken = refreshToken;
            await tokenData.save();
        }
        return await Token.create({userId: userId, refreshToken: refreshToken});
    }
}

export default new TokenService()
