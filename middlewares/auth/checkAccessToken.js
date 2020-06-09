const jwt = require('jsonwebtoken');

const {wordsEnum: {JwtSecret}, requestHeadersEnum, responseStatusCodesEnum} = require('../../constants');
const {authService} = require('../../services');
const {ErrorHandler, Errors} = require('../../error');


module.exports = async (req, res, next) => {
    try {
        const token = req.get(requestHeadersEnum.AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandler(Errors.NOT_FOUND.message, responseStatusCodesEnum.NOT_FOUND, Errors.NOT_FOUND.code));
        }

        jwt.verify(token, JwtSecret, err => {
            if (err) {
                throw new ErrorHandler(Errors.NOT_VALID_TOKEN.message, responseStatusCodesEnum.UNAUTHORIZED, Errors.NOT_VALID_TOKEN.code);
            }
        });

        const tokensFromDB = await authService.getTokensByParams({accessToken: token})

        if (!tokensFromDB) {
            return next(new ErrorHandler(Errors.NOT_VALID_TOKEN.message, responseStatusCodesEnum.UNAUTHORIZED, Errors.NOT_VALID_TOKEN.code));
        }

        req.userId = tokensFromDB.userId;
        console.log(req.userId);
        next()
    } catch (e) {
        next(e)
    }
}
