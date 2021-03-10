const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data) {
    const errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if (validator.isEmpty(data.password)) {
        errors.password = '密码不能为空';
    }

    if (!validator.isLength(data.password, { min: 2, max: 10 })) {
        errors.password = '密码不能小于6位且不能大于8位';
    }

    if (!validator.isEmail(data.email)) {
        errors.email = '邮箱不合法';
    }

    if (validator.isEmpty(data.email)) {
        errors.email = '邮箱不能为空';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};