/**
 * Created by wangxiaobo on 16/8/25.
 */
var fetch = require('node-fetch');
var session = require('koa-session');//设置session
var crypto = require('crypto');//aes加密
var CryptoJS = require('crypto-js');//aes加密
var fs = require('fs');
var path = require('path');

module.exports = {
    synchroData: function *(next) {
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/syncData?' + 'mobile=' + body.mobile + '&' + 'pwd=' + body.pwd);
        var json = yield res.json();
        this.body = json;
        textWrite(body.code,body.mobile);
    },
    msgConfirm: function *(next) {
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/msgConfirm?' + 'mobile=' + body.mobile + '&' + 'msg=' + body.msg);
        console.log(res);
        var json = yield res.json();
        console.log(json,'msgConfirm');
        this.body = json;
    },
    getData: function *(next){
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getData?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getTop10Data: function *(next){
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getTop10Data?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getCallTimesTop10Data:function *(next){//通话总次数top10
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getCallTimesTop10Data?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getCallDurationTop10Data:function *(next){//通话总时长top10
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getCallDurationTop10Data?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getSleepingDaysData:function *(next){//手机静默情况
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getSleepingDaysData?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getNightCallTimesData:function *(next){//夜间活动情况晚12点以后的通话频次
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getNightCallTimesData?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getNightCallDurationData:function *(next){//夜间活动情况晚12点以后的通话时长
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getNightCallDurationData?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    getRoamingDaysData:function *(next){//漫游天数（过去6个月存在漫游通话记录的天数)
        var body = this.request.body;
        var res = yield fetch('http://xda.hbc315.com/call/getRoamingDaysData?' + 'mobile=' + body.mobile);
        //var res = yield fetch('http://172.16.7.30:20027/call/getRoamingDaysData?' + 'mobile=' + body.mobile);
        var json = yield res.json();
        this.body = json;
    },
    Login:function *(next){//用户登录接口
        var body = this.request.body;
        var result = verification(body);
        if (result){
            this.body = {
                result: '1'
            };
        }else {
            this.body = {
                result: '0'
            };
        }
    },
    getRequest: function(url, data) {
        var fullUrl = this.objToUrlString(url, data);
        return fetch(fullUrl, {
            headers: {
                //"x-csrf-token": scoreweb.token
            },
            credentials: 'include'
        });
    }
};
//向TEXT文件写入电话号
function textWrite(code,mobile){
    if(code==="0") {
        fs.appendFileSync(path.join(__dirname, '../records/hbc.txt'), mobile+"\r", {encoding:'utf-8'});
    }else {
        fs.appendFileSync(path.join(__dirname, '../records/cheryfs.txt'), mobile+"\r", {encoding:'utf-8'});
    }
}

//配置文件
var userList = [
    {'text':'hbc','password':'hbc123456'},
    {'text':'cheryfs','password':'*hbc@2016$'}
];

//循环验证配置文件
function verification(data){
    var text = data.text,password = data.password,result=false;
    userList.map(function(obj){
        if(text===obj.text&&password===obj.password){
            result = true;
        }
    });
    return result;
}

//data 是准备加密的字符串,key是你的密钥
function encryption(data, key) {
    var iv = "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
    cipher.setAutoPadding(true);

    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
    cipherChunks.push(cipher.final(cipherEncoding));

    return cipherChunks.join('');
}
//data 是你的准备解密的字符串,key是你的密钥
function decryption(data, key) {
    var iv = "";
    var clearEncoding = 'utf8';
    var cipherEncoding = 'base64';
    var cipherChunks = [];
    var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
    decipher.setAutoPadding(true);

    cipherChunks.push(decipher.update(data, cipherEncoding, clearEncoding));
    cipherChunks.push(decipher.final(clearEncoding));

    return cipherChunks.join('');
}

function Decrypt(word){//解密
    var key = CryptoJS.enc.Utf8.parse("28a4f2d9eb6aa3a2");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    var Data = CryptoJS.enc.Utf8.stringify(decrypt).toString();
    console.log(Data);
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}

function Encrypt(word){//加密
    var key = CryptoJS.enc.Utf8.parse("28a4f2d9eb6aa3a2");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}

var a = "NM3COE+zvV6mBX1SuAB3Ug==",b = "28a4f2d9eb6aa3a2";
//Decrypt(a);