const {TOKEN} = require('../../constants/modelNames.enum')

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: 'tokens',
            timestamps: false
        })

    const User = sequelize.import('./User.js');

    Token.belongsTo(User, {foreignKey: 'userId'})

    return Token;
};
