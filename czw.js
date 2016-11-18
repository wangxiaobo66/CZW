/**
 * Created by wangxiaobo on 16/11/16.
 */
var koa = require('koa');
var app = new koa();
var router = require('koa-router')();
var czwController = require('./controller/czw-controller');
var routerController = require('./controller/router-controller');
var koaBody = require('koa-body')();
var path = require('path');
var staticCache = require('koa-static-cache');//静态文件

//页面
router.get('/index',routerController.index);

//接口



app
    .use(router.routes())
    .use(router.allowedMethods());

app.use(staticCache(path.join(__dirname, 'static/'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
    dynamic: true,
    // buffer: true,
    // prefix: 'static',
    usePrecompiledGzip: true
}));

app.listen(10001);