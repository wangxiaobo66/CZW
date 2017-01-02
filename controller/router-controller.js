/**
 * Created by wangxiaobo on 16/8/25.
 */
var views = require('co-views');
var render = views(__dirname,{map: {html: 'swig'}});

module.exports = {
    index: function *(next){//首页
        this.body = yield render('../dist/template/index.html');
    },
    indexTenders: function *(next){//首页-招标
        this.body = yield render('../dist/template/index-tenders.html');
    },
    indexProject: function *(next){//首页-项目
        this.body = yield render('../dist/template/index-project.html');
    },
    indexProcurement:function *(next){//首页-采购
        this.body = yield render('../dist/template/index-procurement.html');
    },
    indexRegion:function *(next){//首页-地区站
        this.body = yield render('../dist/template/index-region.html');
    },
    regionProvince:function *(next){//省级项目
        this.body = yield render('../dist/template/region-province.html');
    },
    regionCity:function *(next){//市级项目
        this.body = yield render('../dist/template/region-city.html');
    },
    govProcurement:function *(next){//政府采购
        this.body = yield render('../dist/template/gov-procurement.html');
    },
    coProcurement:function *(next){//企业采购
        this.body = yield render('../dist/template/co-procurement.html');
    },
    login: function *(next){//登录
        this.body = yield render('../dist/template/login.html');
    },
    forget: function *(next){
        this.body = yield render('../dist/template/forget.html');
    },
    mine: function *(next){
        this.body = yield render('../dist/template/mine.html');
    },
    register: function *(next){//注册
        this.body = yield render('../dist/template/register.html');
    },
    navigater:function *(next){
        this.body = yield render('../dist/template/navigater.html');
    },
    list:function *(next){
        this.body = yield render('../dist/template/list.html');
    },
    cityList:function *(next){
        this.body = yield render('../dist/template/cityList.html');
    },
    details:function *(next){
        this.body = yield render('../dist/template/details.html');
    },
    search:function *(next){
        this.body = yield render('../dist/template/search.html');
    }
};