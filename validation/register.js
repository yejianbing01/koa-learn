const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    if (!Validator.isLength(data.name, { min: 2, max: 8 })) {
        errors.name = '名称不能小于两位且不能大于8位';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = '名称不能为空';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = '邮箱不能为空';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = '邮箱不合法';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = '密码不能为空';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};