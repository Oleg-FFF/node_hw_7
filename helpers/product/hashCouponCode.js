const bcrypt = require('bcrypt');

module.exports = (couponCode) => {
    return bcrypt.hash(couponCode, 10);
};
