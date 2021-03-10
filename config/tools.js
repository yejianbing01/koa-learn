const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('./keys');


const tools = {
    /**
     * 加密
     * @param {String} password
     */
    encryptSync(password) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },

    /**
     * 密码正常性验证
     * @param {String} password 密码
     * @param {String} originPassword 原密码
     * @returns
     */
    compareSync(password, originPassword) {
        return bcrypt.compareSync(password, originPassword);
    },

    /**
     * 根据邮箱获取头像图片地址
     * @param {String} email
     */
    getGravatarUrlSync(email) {
        return gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
    },

    /**
     * 获取token
     * @param {Object} params
     * @param {Object} params.payload token内容
     * @param {Number} [params.expiresIn=3600] 过期时间ms
     */
    getToken({ payload, expiresIn = 3600 }) {
        return jwt.sign(payload, keys.secretOrKey, { expiresIn });
    },

};


module.exports = tools;