/**
 * Created by wangxiaobo on 16/11/16.
 */
var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
var Router = require('koa-router');
var czwController = require('./controller/czw-controller');
var routerController = require('./controller/router-controller');
var koaBody = require('koa-body')();
var path = require('path');
var staticCache = require('koa-static-cache');//静态文件
//var http = "http://139.198.5.38:10001";
var http = "";
//基础页面
//router.get('/index',routerController.index);//首页
router.get('/index-tenders',routerController.indexTenders);//首页-招标
router.get('/index-project',routerController.indexProject);//首页-项目
router.get('/index-procurement',routerController.indexProcurement);//首页-采购
router.get('/index-region',routerController.indexRegion);//首页-地区站
router.get('/region-province',routerController.regionProvince);//省级项目
router.get('/region-city',routerController.regionCity);//市级项目
router.get('/gov-procurement',routerController.govProcurement);//政府采购
router.get('/co-procurement',routerController.coProcurement);//企业采购
router.get('/mine',routerController.mine);//我的
router.get(http+'/login',routerController.login);//登录
router.get('/forget',routerController.forget);//忘记密码
router.get(http+'/register',routerController.register);//注册
router.get('/navigater',routerController.navigater);//四个导航
router.get('/list',routerController.list);//公用信息list
router.get('/cityList',routerController.cityList)//公用地区信息list
router.get('/details',routerController.details);//公用详情
router.get(http+'/search',routerController.search);//搜索页面
//具体分级
router.get(http+'/',routerController.index);//首页
//二级分页
router.get(http+'/zbxx',routerController.indexTenders);//招标信息首页
router.get(http+'/cgxx',routerController.indexProcurement);//采购信息首页
router.get(http+'/xmxx',routerController.indexProject);//项目信息
router.get(http+'/sa',routerController.indexRegion);//地区首页
//招标信息三级
var zbxx = new Router({
    prefix: http+'/zbxx'
});
zbxx.get('/zbgg_*',routerController.list);//招标公告
zbxx.get('/zbgg',routerController.list);//招标公告
zbxx.get('/bggg_*',routerController.list);//变更公告
zbxx.get('/bggg',routerController.list);//变更公告
zbxx.get('/zbyg_*',routerController.list);//招标预告
zbxx.get('/zbyg',routerController.list);//招标预告
zbxx.get('/zbgs_*',routerController.list);//中标公示
zbxx.get('/zbgs',routerController.list);//中标公示
zbxx.get('/zhongbyg_*',routerController.list);//中标预告
zbxx.get('/zhongbyg',routerController.list);//中标预告
zbxx.get('/dy_*',routerController.list);//答疑
zbxx.get('/dy',routerController.list);//答疑
zbxx.get('/bx_*',routerController.list);//比选
zbxx.get('/bx',routerController.list);//比选
zbxx.get('/zgys_*',routerController.list);//资格预审
zbxx.get('/zgys',routerController.list);//资格预审
zbxx.get('/zgysjg_*',routerController.list);//预审结果
zbxx.get('/zgysjg',routerController.list);//预审结果
zbxx.get('/gczb_*',routerController.list);//工程招标
zbxx.get('/gczb',routerController.list);//工程招标
zbxx.get('/fwzb_*',routerController.list);//服务招标
zbxx.get('/fwzb',routerController.list);//服务招标
zbxx.get('/hwzb_*',routerController.list);//货物招标
zbxx.get('/hwzb',routerController.list);//货物招标
//招标详情
zbxx.get('/*',routerController.details);////招标详情页
app.use(zbxx.routes());
//采购信息三级
var cgxx = new Router({
    prefix: http+'/cgxx'
});
cgxx.get('/zfcg_*',routerController.list);//政府采购
cgxx.get('/qycg_*',routerController.list);//企业采购
cgxx.get('/zfcg',routerController.list);//政府采购
cgxx.get('/qycg',routerController.list);//企业采购
//采购详情
cgxx.get('/*',routerController.details);////采购详情页
app.use(cgxx.routes());
//项目信息三级
var xmxx = new Router({
    prefix: http+'/xmxx'
});
xmxx.get('/vipxm_*',routerController.list);//vip项目
xmxx.get('/xmdt_*',routerController.list);//项目动态
xmxx.get('/xmgz_*',routerController.list);//项目跟踪
xmxx.get('/xmhzpf_*',routerController.list);//项目核准
xmxx.get('/gcsj_*',routerController.list);//工程设计
xmxx.get('/sgzb_*',routerController.list);//施工准备
xmxx.get('/zjjd_*',routerController.list);//在建阶段
xmxx.get('/sphc_*',routerController.list);//审批核查
xmxx.get('/jys_*',routerController.list);//建议书阶段
xmxx.get('/kxx_*',routerController.list);//可行性研究
xmxx.get('/vipxm',routerController.list);//vip项目
xmxx.get('/xmdt',routerController.list);//项目动态
xmxx.get('/xmgz',routerController.list);//项目跟踪
xmxx.get('/xmhzpf',routerController.list);//项目核准
xmxx.get('/gcsj',routerController.list);//工程设计
xmxx.get('/sgzb',routerController.list);//施工准备
xmxx.get('/zjjd',routerController.list);//在建阶段
xmxx.get('/sphc',routerController.list);//审批核查
xmxx.get('/jys',routerController.list);//建议书阶段
xmxx.get('/kxx',routerController.list);//可行性研究
//项目详情
xmxx.get('/*',routerController.details);//项目详情页
app.use(xmxx.routes());
//配置详情地址
var sa = new Router({
    prefix:http+'/sa'
});
sa.get('/*_*',routerController.cityList);//地区list
sa.get('/*_*_*',routerController.cityList);//地区list
sa.get('/*',routerController.regionProvince);//省市二级页
app.use(sa.routes());


//接口
router.get('/province',czwController.province);//获取地区
router.get('/city',czwController.city);//获取城市
router.get('/category',czwController.category);//行业种类
router.post('/login',koaBody,czwController.login);//登录接口
router.post('/searchList',koaBody,czwController.searchList);//各种list
router.post('/details',koaBody,czwController.details);//详情页
router.post('/search',koaBody,czwController.search);//搜索接口
router.post('/level',koaBody,czwController.level);//获取用户登录状态以及权限
router.post('/register',koaBody,czwController.register);//注册接口
router.post('/type',koaBody,czwController.type);//单独获取登录状态
router.post('/status',koaBody,czwController.status);//获取用户名


app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(staticCache(path.join(__dirname, 'dist/'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    dynamic: true,
    // buffer: true,
    // prefix: 'static',
    usePrecompiledGzip: true
}));

app.listen(10001);