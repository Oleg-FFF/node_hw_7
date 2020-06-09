const Joi = require("joi");
const productValidationSchema = require('../../validators/product/product.validator')
const errorHandler = require('../../error/ErrorHandler')


module.exports = async (req, res, next) => {
    console.log(req.body);
    try {
        const product = req.body;

        const {error} = Joi.validate(product, productValidationSchema)

        if(error) {
            return next(new errorHandler(error.details[0].message, 400))
        }
        next();

    } catch (e) {
        res.json(e.toString())
    }
}
