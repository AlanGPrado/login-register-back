'use strict';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    static associate(models) {

    }

    static async register(user) {
        user = await this.hashPassword(user);
        return await User.create(user);
    }

    static async hashPassword(user) {
        return {
            ...user,
            ...(user.password && { password: await this.generatePassword(user.password) }),
        }
    }

    static async set(id_user, fields) {
        fields = await this.hashPassword(fields);
        return User.update(fields, { where: { id_user } })
    }

    static async login(email) {
        return await User.findOne({ where: { email } })
    }

    static async comparePasswords(reqPassword, userPassword) {
        return await bcrypt.compare(reqPassword, userPassword)
    }

    static async generatePassword(pwd) {
        return await bcrypt.hash(pwd, 10);
    }

    static async deleteUser(id_user) {
        return await Product.destroy({ where: { id_user } });
    }
}

const initUserModel = (sequelize) => {
    User.init({
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'users',
    });

    return User;
};

export { initUserModel };