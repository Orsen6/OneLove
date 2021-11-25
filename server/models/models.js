import types from 'sequelize';
import sequelize from '../db.js';

const {DataTypes} = types;

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
    password: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    name: {type: DataTypes.STRING, allowNull: false},
    surname: {type: DataTypes.STRING, allowNull: false},
    image: {type: DataTypes.STRING},
    gender: {type: DataTypes.SMALLINT, defaultValue: 3},
    age: {type: DataTypes.SMALLINT, allowNull: false},
    summary: {type: DataTypes.TEXT},
    passLink: {type: DataTypes.STRING, unique: true}
})

export const Token = sequelize.define('token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, allowNull: false}
})

User.hasOne(Token);
Token.belongsTo(User);

export default {User, Token}