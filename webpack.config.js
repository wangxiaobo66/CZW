/**
 * Created by wangxiaobo on 16/11/18.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        'index': ['./static/js/page/index/index.js'],//首页
        'indexTenders':['./static/js/page/indexTenders/indexTenders.js'],//首页-招标
        'indexProject':['./static/js/page/indexProject/indexProject.js'],//首页-项目
        'indexProcurement':['./static/js/page/indexProcurement/indexProcurement.js'],//首页-采购
        'indexRegion':['./static/js/page/indexRegion/indexRegion.js'],//首页地区站
        'regionProvince':['./static/js/page/regionProvince/regionProvince.js'],//省级项目
        'regionCity':['./static/js/page/regionCity/regionCity.js'],//市级项目
        'govProcurement':['./static/js/page/govProcurement/govProcurement.js'],//政府采购
        'coProcurement':['./static/js/page/coProcurement/coProcurement.js'],//企业采购
        'mine': ['./static/js/page/mine/mine.js'],//我的
        'login':['./static/js/page/login/login.js'],//登录
        'forget':['./static/js/page/forget/forget.js'],//忘记密码
        'register':['./static/js/page/register/register.js'],//注册
        'navigater':['./static/js/page/navigater/navigater.js'],//页面导航(四大导航)
        'list':['./static/js/page/list/list.js'],//公用信息list列表
        'cityList':['./static/js/page/cityList/cityList.js'],//公用地区list列表
        'details':['./static/js/page/details/details.js'],//公用详情
        'search':['./static/js/page/search/search.js']//搜索
    },
    output: {
        //path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "",
        chunkFilename: "[name].chunk.js",
        externals: [
            {
                'es5-shim': true,
                'es5-sham': true
            }
        ]
    },
    /*
    externals:{
        'react':'React',
        'react-dom':'ReactDOM',
        'redux':'Redux',
        'react-redux':'ReactRedux'
    },
    */
    module: {
        resolve: {
            root: path.resolve('static'),
            modulesDirectorie: ['node_modules'],
            extensions: ['', '.js', '.css', '.scss', '.png', '.jpg']
        },
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                loaders: ['url-loader?limit=1000&name=[path][name][hash:8].[ext]', 'img?minimize']
            },
            {
                test: /\.(scss|css)/,
                loaders: ['style', 'css', 'sass']
            },
            //{test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/, /js\/lib/]}
        ],
        noParse: ['react', 'react-dom' , 'redux', 'react-redux'],
        plugins: []
    }
};