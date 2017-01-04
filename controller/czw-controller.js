/**
 * Created by wangxiaobo on 16/8/25.
 */
var fetch = require('node-fetch');
var session = require('koa-session');//设置session
var fs = require('fs');
var path = require('path');
var server = "http://139.198.5.38:8002/mobile.Member/";
var serverInfo = "http://139.198.5.38:8002/mobile.info/";
var region = require('../region.json');
var category = require('../category.json');
//普通：ceshi092602  密码：123456；
//VIP： ceshi20140418  密码：123456

module.exports = {
    //读地区json文件
    province:function *(next){
        this.body =  {province:region.province}
    },
    //读城市
    city:function *(next){
        this.body = {city:region.city}
    },
    //行业种类json文件
    category:function *(next){
      this.body = {category:category.category}
    },
    //登陆接口
    login: function *(next){
        var session = randomWord(true,32,64);
        var data = this.request.body;
        var url = server+"login?loginid="+data.id+"&password="+data.password+"&msession="+session;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
                console.log(error);
            }
        );
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //注册接口
    register:function *(next){
        var session = randomWord(true,32,64);
        var data = this.request.body;
        var url = server + "regist?loginid="+data.user+"&password="+data.password+"&pwd="+data.passwordAgain+"&company="+encodeURIComponent(data.CN)+"&contact="+encodeURIComponent(data.name)+"&tphone="+data.tel+"&mphone="+data.phone+"&email="+data.email+"&msession="+session;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
                console.log(error);
            }
        );
        console.log(result);
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //判断用户登录状态
    type:function *(next){
        var data = this.request.body;
        var url = server + "getMsession?msession="+ data.msession;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //判断是否超时,获取用户权限,用户等级
    level:function *(next){
        var data = this.request.body;
        var url = server + "getMsession?msession="+ data.msession;
        var level = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var levelJson = yield JSON.parse(level);
        var login;
        if(levelJson.value!=="nologin"){
            login=0;
        }else{
            login=1;
        }
        this.body={
            login:login
        }
    },
    //查询用户名接口
    status:function *(next){
        var data = this.request.body;
        var url = server + "checkLoginid?loginid="+data.loginid+"&msession="+data.msession;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //list接口
    searchList:function *(next){//,tablename1,tablename2,classbid不在每个里面都做配置了,直接在接口端判断
        var data = this.request.body;
        var url = serverInfo+"search?kw=" + encodeURIComponent(data.val) + "&tablename=" + data.tablename1 + "&tablename=" + data.tablename2 + "&tablename=" + data.tablename3 +
                "&tablename1=" + (data.tablenameone != undefined?data.tablenameone:'') + "&tablename2=" + (data.tablenametwo != undefined?data.tablenametwo:'') + "classbid" + (data.classbid != undefined?data.classbid:'') +
            "&area=" + data.area + "&cate=" + data.cate + "&time=" +data.time + "&time2=" + data.time2 + "&page=" + data.page + "&rp=" + data.rp;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //搜索接口
    search:function *(next){
        var data = this.request.body;
        var url = serverInfo+"search?kw=" + encodeURIComponent(data.val)+ "&time=" +data.time + "&time2=" + data.time2 + "&page=" + data.page + "&rp=" + data.rp;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        this.body = {
            result:json
        }
    },
    //详情接口
    details:function *(next){//请求详情数据
        var data = this.request.body;
        var url = serverInfo + "infoshow?infoid="+data.id+'&msession='+data.msession;
        var result = yield postFetch(url).then(
            body => {
                return body;
            }
        ).catch(function(error){
            console.log(error)
        });
        var json = yield JSON.parse(result);
        if (data.msession==""){//未登录状态
            delete json.description;
        }else{//已登录有msession
            //判断是否超时,获取用户权限,用户等级
            var url = server + "getMsession?msession="+ data.msession;
            var level = yield postFetch(url).then(
                body => {
                    return body;
                }
            ).catch(function(error){
                console.log(error)
            });
            var levelJson = yield JSON.parse(level);
            if(levelJson.value!=="nologin"){
                switch (levelJson.CUST_RIGHT_GROUP){
                    case '0':
                        delete json.description;
                        break;
                    case '1':
                        if(josn.tableName=='3010'||josn.tableName=='3020'||josn.tableName=='3030'||josn.tableName=='3040'||josn.tableName=='3060'||josn.tableName=='3070'||josn.tableName=='3080'){
                            delete json.description;
                        }
                        break;
                    case '2':
                        break;
                    case '3':
                        break;
                }
            }else {
                delete json.description;
            }
        }
        this.body = {
            result:json
        }
    }
};

//生成32位到64位随机串方法
function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}
//randomWord(true, 32, 64)

//post请求共用方法
function postFetch(url){
    return fetch(url).then(function(res) {
                return res.text();
            }).then(function(body) {
                return body;
            })
            .catch(function(error){
                console.log(error);
            });
}