const jwt = require('jsonwebtoken');

const {wordsEnum: {JwtRefreshSecret}, requestHeadersEnum, responseStatusCodesEnum} = require('../../constants');
const {authService} = require('../../services');
const {ErrorHandler, Errors} = require('../../error');


module.exports = async (req, res, next) => {
    try {
        const refreshToken = req.get(requestHeadersEnum.AUTHORIZATION);

        if (!refreshToken) {
            return next(new ErrorHandler(Errors.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_FOUND.code));
        }

        jwt.verify(refreshToken, JwtRefreshSecret, err => {
            if (err) {
                throw new ErrorHandler(Errors.NOT_VALID_TOKEN.message, responseStatusCodesEnum.UNAUTHORIZED, Errors.NOT_VALID_TOKEN.code);
            }
        });

        const tokensFromDB = await authService.getTokensByParams({refreshToken})

        if (!tokensFromDB) {
            return next(new ErrorHandler(Errors.NOT_VALID_TOKEN.message, responseStatusCodesEnum.UNAUTHORIZED, Errors.NOT_VALID_TOKEN.code));
        }

        req.userId = tokensFromDB.userId
        next()
    } catch (e) {
        next(e)
    }
}
