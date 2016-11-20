/**
 * Created by wangxiaobo on 16/8/25.
 */
var views = require('co-views');
var render = views(__dirname,{map: {html: 'swig'}});

module.exports = {
    index: function *(next){
        this.body = yield render('../template/index.html');
    },
    login: function *(next){
        this.body = yield render('../template/login.html');
    },
    forget: function *(next){
        this.body = yield render('../template/forget.html');
    },
    mine: function *(next){
        this.body = yield render('../template/mine.html');
    },
    register: function *(next){
        this.body = yield render('../template/register.html');
    }
};