const Joi = require('joi')

const {regexpEnum} = require('../../constants')

module.exports = Joi.object().keys({
    name: Joi.string().trim().alphanum().min(2).max(60).optional(),
    email: Joi.string().regex(regexpEnum.EMAIL).optional()
})
