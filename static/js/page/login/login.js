/**
 * Created by wangxiaobo on 16/11/18.
 */
require('./login.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

const { Header } = require('../../component/Header/Header');
import '../../component/Toast/Toast';

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text:"",
            password:""
        }
    }

    render() {
        return (
            <div className="module-login">
                <Header />
                <div className="Login">
                    <div className="nav"><span>首页</span>><span>登录</span></div>
                    <div className="content">
                        <p className="title">用户名</p>
                        <input className="input-full" type="text" value={this.state.text} placeholder="请输入您的用户名" onChange={(e) => this.change(e,"text")}/>
                        <p className="title">密码</p>
                        <input className="input-full" type="password" value={this.state.password} placeholder="请输入您的密码" onChange={(e) => this.change(e,"password")}/>
                        <p className="forget cl"><a href="tel:400-006-6655">忘记密码?</a></p>
                        <a className="btn btn-login" onClick={(e) => this.click(e)}>登录</a>
                        <a href="/register" className="btn btn-register">立即注册</a>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    change(e,name){
        let val = e.target.value;
        switch (name){
            case "text":
                this.setState({
                   text:val
                });
                break;
            case "password":
                this.setState({
                    password:val
                });
                break;
        }
    }
    click(e){
        let {text,password} = this.state;
        console.log(text,password);
        if(text!==""&&password!==""){
            let info = {id:text,password:password};
            util.postRequest('/login',info).then(
                data =>{
                    data.json().then(
                        json => {
                            if(json.result.id=="-1000"){
                                window.toast('网络问题,请稍后再试!');
                            }else if(json.result.id=="-6"){
                                window.toast('账号密码有误!');
                            }else{
                                sessionStorage.setItem("msession", json.result.msession);
                                window.location.href="/";
                            }
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
    }
}
function select(state) {
    return {

    }
}
let Login = connect(select)(component);

render(
    <Provider store={store}>
        <Login />
    </Provider>
    ,
    document.getElementById("login")
);