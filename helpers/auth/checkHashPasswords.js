const bcrypt = require('bcrypt')

module.exports = async (password, hashedPassword) => {
    const isPasswordsEquals = await bcrypt.compare(password, hashedPassword);

    return isPasswordsEquals
}
