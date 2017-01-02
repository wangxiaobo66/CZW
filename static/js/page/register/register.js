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

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
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
                            <input className="reg-input" type="text" name="" placeholder="6-16位小写字母或数字" maxlength="16" minLength="6"/>
                        </li>
                        <li className="reg-list">
                            <p>密码</p>
                            <input className="reg-input" type="test" name="" placeholder="6-16位小写字母或数字" maxlength="16" minLength="6"/>
                        </li>
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
                        <li className="reg-list">
                            <p>确认密码</p>
                            <input className="reg-input" type="test" name=""/>
                        </li>
                        <li className="reg-list">
                            <p>公司名称</p>
                            <input className="reg-input" type="test" name="" placeholder="请输入公司全称含分公司或办事处"/>
                        </li>
                        <li className="reg-list">
                            <p>联系人姓名</p>
                            <input className="reg-input" type="test" name=""/>
                        </li>
                        <li className="reg-list">
                            <p>固定电话</p>
                            <input className="reg-input-zone" type="test" name=""/><span className="line"></span><input
                                className="reg-input-tel" type="test" name=""/>
                        </li>
                        <li className="reg-list">
                            <p>电子邮箱</p>
                            <input className="reg-input" type="test" name="" placeholder="请填写您的电子邮箱，方便我们将最新项目发送到您的邮箱"/>
                            <input className="reg-code" type="" name="" placeholder="验证码"/>
                            <span className="reg-iq">20+15= ?</span>
                        </li>
                        <li className="reg-list">
                            <p>手机号码</p>
                            <input className="reg-input" type="test" name=""/>
                        </li>
                        <a className="btn btn-register" href="">立即注册</a>
                    </ul>
                </div>
            </div>
        )
    }
    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

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