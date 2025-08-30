const usermodel = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true 
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: true 
        },
        otpGeneratedTime: {
            type: DataTypes.DATE,
            allowNull: true 
        }
    });

    return User;
}

export {
    usermodel as User
}

export default usermodel;
