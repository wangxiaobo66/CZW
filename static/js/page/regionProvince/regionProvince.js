/**
 * Created by wangxiaobo on 16/12/4.
 */
require('./regionProvince.scss');
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
const { Footer } = require('../../component/Footer/Footer');

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="module-regionProvince">
                <Header />
                <div className="Province">
                    <div className="nav">
                        <span>首页</span>><span>地区站</span>><span>广东省</span>
                    </div>
                    <div className="banner">
                        <div className="banner-title"><img src="./img/banner.jpg"></img>
                            <p className="title-province">GUANGDONG BIDDING</p>
                            <p className="subheading-province">广东省招标</p>
                        </div>
                    </div>
                    <nav className="details">
                        <a className="quick-entry-link">
                            <p className="details-item details-item-1"><span className="iconfont icon-9"></span></p>
                            <p>广东招标</p>
                        </a>
                        <a className="quick-entry-link">
                            <p className="details-item details-item-2"><span className="iconfont icon-6"></span></p>
                            <p>广东中标</p>
                        </a>
                        <a className="quick-entry-link">
                            <p className="details-item details-item-3"><span className="iconfont icon-5"></span></p>
                            <p>广东采购</p>
                        </a>
                        <a className="quick-entry-link">
                            <p className="details-item details-item-4"><span className="iconfont icon-8"></span></p>
                            <p>广东VIP项目</p>
                        </a>
                    </nav>

                    <ul className="dynamic">
                        <h2>
                            <span className="h2-title-province">广东省招标公告</span>
                            <span className="more">更多</span>
                        </h2>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                    </ul>
                    <ul className="dynamic">
                        <h2>
                            <span className="h2-title-province">广东省采购信息</span>
                            <span className="more">更多</span>
                        </h2>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">北京软件产品质量检测检验中心北京市客户服务</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                    </ul>
                    <Footer />
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
let RegionProvince = connect(select)(component);

render(
    <Provider store={store}>
        <RegionProvince />
    </Provider>
    ,
    document.getElementById("regionProvince")
);