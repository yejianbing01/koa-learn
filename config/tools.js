const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


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
     * 根据邮箱获取头像图片地址
     * @param {String} email 
     */
    getGravatarUrlSync(email) {
        return gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })
    }

}


module.exports = tools;