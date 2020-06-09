const db = require('../../dataBase').getInstance();
const {TOKEN} = require('../../constants/modelNames.enum')

module.exports = {
    getTokensByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.findOne({
            where: params
        })
    },

    deleteByParams: (params) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.destroy({
            where: params
        })
    },

    createTokenPair: (tokens) => {
        const TokenModel = db.getModel(TOKEN);

        return TokenModel.create(tokens);
    }
};
