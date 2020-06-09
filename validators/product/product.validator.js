const Joi = require('joi')

module.exports = Joi.object().keys({
    id: Joi.number().integer().min(1),
    type: Joi.string().alphanum().trim().min(2).required(),
    brand: Joi.string().trim().min(2).required(),
    price: Joi.number().integer().min(0.01).required(),
    sale_price: Joi.number().integer().min(0.01).optional(),
    coupon_code: Joi.string().trim().min(6).optional()
})
