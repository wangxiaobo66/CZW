/**
 * Created by wangxiaobo on 16/11/20.
 */
require('./register.scss');
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


let data = {user:false,password:false,passwordAgain:false,CN:false,name:false,areaCode:false,tel:false,email:false,mobile:false,code:false};
class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            password:'',
            passwordAgain:'',
            CN:'',
            name:'',
            areaCode:'',
            tel:'',
            email:'',
            phone:'',
            code:'',
            a:null,
            b:null,
            c:null
        }
    }

    render() {
        return (
            <div className="module-register">
                <Header />
                <div className="Register">
                    <div className="nav">
                        <span>首页</span>><span>注册</span>
                    </div>

                    <ul>
                        <li className="reg-list">
                            <p>用户名</p>
                            <input className="reg-input" type="text" name="" placeholder="6-16位小写字母或数字" maxLength="16" minLength="6"
                                   value={this.state.user}
                                   onChange={(e) => this.change(e,'user')}
                                   onBlur={(e) => this.blur(e,'user')}
                            />
                        </li>
                        <li className="reg-list">
                            <p>密码</p>
                            <input className="reg-input" type="password" name="" placeholder="6-16位小写字母或数字" maxLength="16" minLength="6"
                                   value={this.state.password}
                                   onChange={(e) => this.change(e,'password')}
                                   onBlur={(e) => this.blur(e,'password')}
                            />
                        </li>
                        {/*
                            <li className="reg-list">
                                <p>密码强度</p>
                                <ul className="strength s">
                                    <li className="weak">
                                        弱
                                    </li>
                                    <li className="middle">
                                        中
                                    </li>
                                    <li className="strong">
                                        强
                                    </li>
                                </ul>
                            </li>
                        */}
                        <li className="reg-list">
                            <p>确认密码</p>
                            <input className="reg-input" type="password" name="" maxLength="16" minLength="6"
                                   value={this.state.passwordAgain}
                                   onChange={(e) => this.change(e,'passwordAgain')}
                                   onBlur={(e) => this.blur(e,'passwordAgain')}
                            />
                        </li>
                        <li className="reg-list">
                            <p>公司名称</p>
                            <input className="reg-input" type="test" name="" placeholder="请输入公司全称含分公司或办事处"
                                   value={this.state.CN}
                                   onChange={(e) => this.change(e,'CN')}
                                   onBlur={(e) => this.blur(e,'CN')}
                            />
                        </li>
                        <li className="reg-list">
                            <p>联系人姓名</p>
                            <input className="reg-input" type="test" name=""
                                   value={this.state.name}
                                   onChange={(e) => this.change(e,'name')}
                                   onBlur={(e) => this.blur(e,'name')}
                            />
                        </li>
                        <li className="reg-list">
                            <p>固定电话</p>
                            <input className="reg-input-zone" type="tel" name="" maxLength="4"
                                   value={this.state.areaCode}
                                   onChange={(e) => this.change(e,'areaCode')}
                                   onBlur={(e) => this.blur(e,'areaCode')}
                            />
                            <span className="line"></span>
                            <input className="reg-input-tel" type="tel" name="" maxLength="8"
                                   value={this.state.tel}
                                   onChange={(e) => this.change(e,'tel')}
                                   onBlur={(e) => this.blur(e,'tel')}
                            />
                        </li>
                        <li className="reg-list">
                            <p>电子邮箱</p>
                            <input className="reg-input" type="email" name="" placeholder="请填写您的电子邮箱，方便我们将最新项目发送到您的邮箱"
                                   value={this.state.email}
                                   onChange={(e) => this.change(e,'email')}
                                   onBlur={(e) => this.blur(e,'email')}
                            />
                            <input className="reg-code" type="" name="" placeholder="验证码"
                                   value={this.state.code}
                                   onChange={(e) => this.change(e,'code')}
                                   onBlur={(e) => this.blur(e,'code')}
                            />
                            <span className="reg-iq">{this.state.a}+{this.state.b}= ?</span>
                        </li>
                        <li className="reg-list">
                            <p>手机号码</p>
                            <input className="reg-input" type="tel" name="" maxLength="11"
                                   value={this.state.phone}
                                   onChange={(e) => this.change(e,'phone')}
                                   onBlur={(e) => this.blur(e,'phone')}
                            />
                        </li>
                        <a className="btn btn-register" href="javascript:;" onClick={(e) => this.click()}>立即注册</a>
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount() {
            let a = this.math();
            let b = this.math();
            this.setState({
                a:a,
                b:b,
                c:a+b
            });
    }

    componentWillReceiveProps(nextProps) {

    }
    change(e,name){
        let val = e.target.value;
        switch (name){
            case 'user':
                this.setState({
                    user:val
                });
                break;
            case 'password':
                this.setState({
                    password:val
                });
                break;
            case 'passwordAgain':
                this.setState({
                    passwordAgain:val
                });
                break;
            case 'CN':
                this.setState({
                    CN:val
                });
                break;
            case 'name':
                this.setState({
                    name:val
                });
                break;
            case 'areaCode':
                this.setState({
                    areaCode:val
                });
                break;
            case 'tel':
                this.setState({
                    tel:val
                });
                break;
            case 'email':
                this.setState({
                    email:val
                });
                break;
            case 'phone':
                this.setState({
                    phone:val
                });
                break;
            case 'code':
                this.setState({
                    code:val
                });
                break;
        }
    }
    blur(e,name){
        let val = e.target.value;
        switch (name){
            case 'user':
                if(util.match.name.reg.test(val)){
                    data.user=true;
                }else {
                    window.toast(util.match.name.msg);
                    data.user=false;
                }
                break;
            case 'password':
                if(util.match.password.reg.test(val)){
                    data.password = true;
                }else {
                    window.toast(util.match.password.msg);
                    data.password = false;
                }
                break;
            case 'passwordAgain':
                if(val == this.state.password){
                    data.passwordAgain=true;
                }else{
                    window.toast('两次密码输入必须一致');
                    data.passwordAgain=false;
                }
                break;
            case 'CN':
                if(val!=''){
                    data.CN=true;
                }else {
                    window.toast('公司名称不能为空');
                    data.CN=false;
                }
                break;
            case 'name':
                if(val!=''){
                    data.name=true;
                }else {
                    window.toast('联系人不能为空');
                    data.name=false;
                }
                break;
            case 'areaCode':
                if(util.match.areaCode.reg.test(val)){
                    data.areaCode = true;
                }else {
                    window.toast(util.match.areaCode.msg);
                    data.areaCode=false;
                }
                break;
            case 'tel':
                if(util.match.tel.reg.test(val)){
                    data.tel=true;
                }else {
                    window.toast(util.match.tel.msg);
                    data.tel=false;
                }
                break;
            case 'email':
                if(util.match.email.reg.test(val)){
                    data.email=true;
                }else {
                    window.toast(util.match.email.msg);
                    data.email=false;
                }
                break;
            case 'phone':
                if(util.match.mobile.reg.test(val)){
                    data.mobile=true;
                }else {
                    window.toast(util.match.mobile.msg);
                    data.mobile=false;
                }
                break;
            case 'code':
                if (val!=this.state.c){
                    data.code=false;
                    window.toast('请输入正确的验证码')
                }else {
                    data.code=true;
                }
                break;
        }
    }
    math(){
        return Math.round(Math.random()*9+1)
    }
    click(){
        let {user,password,passwordAgain,CN,name,areaCode,tel,email,phone} = this.state;
        if(data.user!=false&&data.password!=false&&data.passwordAgain!=false&&data.CN!=false&&data.name!=false&&data.areaCode!=false&&data.tel!=false&&data.email!=false&&data.mobile!=false&&data.code!=false){
            let info = {user:user,password:password,passwordAgain:passwordAgain,CN:CN,name:name,tel:areaCode+tel,email:email,phone:phone}
            util.postRequest('/register',info).then(
                data => {
                    data.json().then(
                        json =>{
                            if(json.result.id=="001"){
                                window.toast('注册成功');
                                window.location.href= "/";
                                sessionStorage.setItem("msession", json.result.msession);
                            }else if(json.result.id=="-1000"){
                                window.toast('注册成功,请重新登录');
                                window.location.href= "/login";
                            }else{
                                window.toast('系统异常,请重新注册')
                            }
                        }
                    )
                }
            )
        }else {
            window.toast('请输入正确的信息')
        }
    }
}
function select(state) {
    return {

    }
}
let Register = connect(select)(component);

render(
    <Provider store={store}>
        <Register />
    </Provider>
    ,
    document.getElementById("register")
);