const bcrypt = require('bcrypt');

exports.encryptUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

exports.isPasswordOK = async ({password, hashedPassword}) => {
    return await bcrypt.compare(password, hashedPassword);
};