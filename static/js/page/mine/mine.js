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

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="module-mine">
                <Header />
                <div className="Mine cl">
                    <div className="nav">
                        <span>首页</span>><span>我的</span>
                    </div>

                    <div className="content">
                        <img className="avatar" src="../img/icon.png"/>
                        <p className="gray">迈克尔·李宝库</p>
                        <p className="free">开通会员您可以享受更多极具商业价值的信息和更周到的服务</p>
                        <p className="logo-vip">免费</p>
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
                    <a className="btn btn-register" href="">立即开通</a>
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