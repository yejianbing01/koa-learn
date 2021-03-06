const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    const errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if (!validator.isLength(data.name, { min: 2, max: 8 })) {
        errors.name = '名称不能小于两位且不能大于8位';
    }

    if (validator.isEmpty(data.name)) {
        errors.name = '名称不能为空';
    }

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