const bcrypt = require('bcrypt')

module.exports = async (couponCode, hashedCouponCode) => {
    const isCouponCodeValid = await bcrypt.compare(couponCode, hashedCouponCode);

    return isCouponCodeValid
}





