const jwt = require('jsonwebtoken');

const {wordsEnum: {JwtSecret, JwtRefreshSecret}} = require('../../constants');

module.exports = () => {
    const accessToken = jwt.sign({}, JwtSecret, {expiresIn: '10d'})
    const refreshToken = jwt.sign({}, JwtRefreshSecret, {expiresIn: '15d'})

    return {
        accessToken,
        refreshToken
    }
}
