/**
 * Created by wangxiaobo on 16/12/6.
 */
require('./govProcurement.scss');
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
        this.state = {

        }
    }
    render() {
        return(
            <div className="module-govProcurement">
                <Header />
                <div className="contaner">
                    <div className="nav">
                        <span>首页</span>><span>采购</span>><span>政府采购</span>
                    </div>
                    <ul className="dynamic">
                        <h2>
                            <span className="iconfont icon-red icon-15"></span>
                            <span className="h2-title">政府采购</span>
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
                            <p className="dynamic-list-title">云南省烟草公司临沧市公司凤庆县小湾烟站等8个建设项目一来源采购公告</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                        <li className="dynamic-list">
                            <p className="dynamic-list-title">云南省烟草公司临沧市公司凤庆县小湾烟站等8个建设项目一来源采购公告</p>
                            <p>
                                <span className="dynamic-list-addr">南京</span>
                                <span className="dynamic-list-type">工程招标</span>
                                <span className="dynamic-list-time">2016-11-26</span>
                            </p>
                        </li>
                    </ul>
                    <div className="stick solid">
                        置顶
                    </div>
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
        index: state.index
    }
}
let GovProcurement = connect(select)(component);

render(
    <Provider store={store}>
        <GovProcurement />
    </Provider>,
    document.getElementById("govProcurement")
);