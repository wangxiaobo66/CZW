/**
 * Created by wangxiaobo on 16/8/25.
 */
var views = require('co-views');
var render = views(__dirname,{map: {html: 'swig'}});

module.exports = {
    index: function *(next){
        this.body = yield render('../template/index.html');
    }
};