/**
 * Created by wangxiaobo on 16/11/20.
 */
require('./mine.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

//引入模块
const { Header } = require('../../component/Header/Header');
import '../../component/Toast/Toast';

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:null,
            CUST_RIGHT_GROUP:null
        }
    }

    render() {
        let {name,CUST_RIGHT_GROUP} = this.state;
        console.log(name,CUST_RIGHT_GROUP);
        return (
            <div className="module-mine">
                <Header />
                <div className="Mine cl">
                    <div className="nav">
                        <span>首页</span>><span>我的</span>
                    </div>

                    <div className="content">
                        <img className="avatar" src="../img/icon.png"/>
                        <p className="gray">{name!=null?name:""}</p>
                        {
                            CUST_RIGHT_GROUP!=null?
                                this.level(CUST_RIGHT_GROUP)
                                :null
                        }
                    </div>

                    <p className="lists"><img className="icon star" src="../img/star.png"/>我的收藏<img className="arrow"
                                                                                                    src="../img/right-arrow.png"/>
                    </p>
                    <p className="lists"><img className="icon eye" src="../img/eye.png"/>我的浏览<img className="arrow"
                                                                                                  src="../img/right-arrow.png"/>
                    </p>
                    <p className="lists"><img className="icon phone" src="../img/phone.png"/>客服专线<img className="arrow"
                                                                                                      src="../img/right-arrow.png"/><a
                        className="hot-line" href="tel:400-006-6655">400-006-6655</a></p>
                    {
                        CUST_RIGHT_GROUP!=null?
                            CUST_RIGHT_GROUP == "0"?
                                <a className="btn btn-register" href="">立即开通</a>
                                :null
                            :null
                    }

                </div>
            </div>
        )
    }
    level(num){
        let describe = [];
        switch (num){
            case "0":
                describe.push(<p className="free">开通会员您可以享受更多极具商业价值的信息和更周到的服务</p>)
                describe.push(<p className="logo-vip">免费会员</p>)
                break;
            case "1":
                describe.push(<p className="logo-vip">普通会员</p>);
                break;
            case "2":
                describe.push(<p className="logo-vip">标准会员</p>);
                break;
            case "3":
                describe.push(<p className="logo-vip">vip会员</p>);
                break;
        }
        return describe
    }
    componentDidMount() {
        let id = sessionStorage.getItem("id");
        let msession = sessionStorage.getItem("msession");
        if(msession==null||id==null){
            window.toast('请登录');
            setTimeout(function(){
                window.location.href="/login"
            },1000)
        }else if(msession!=null&&id!=null){
            let info = {msession:msession};
            util.postRequest('/type',info).then(
                data => {
                    data.json().then(
                        json => {
                            if(json.result.value == "nologin"){
                                window.toast('请重新登录');
                                setTimeout(function(){
                                    window.location.href="/login"
                                },1000)
                            }else{
                                let value = JSON.parse(json.result.value);
                                this.setState({
                                    name:value.loginid,
                                    CUST_RIGHT_GROUP:value.CUST_RIGHT_GROUP
                                })
                            }
                        }
                    )
                }
            )
        }
    }

    componentWillReceiveProps(nextProps) {

    }
}
function select(state) {
    return {}
}
let Mine = connect(select)(component);

render(
    <Provider store={store}>
        <Mine />
    </Provider>
    ,
    document.getElementById("mine")
);