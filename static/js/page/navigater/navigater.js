/**
 * Created by wangxiaobo on 16/12/4.
 */
require('./navigater.scss');
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
            province:null
        }
    }

    render() {
        return(
            <div className="module-navigater">
                <Header />
                <div className="Navigater">
                    <div className="nav">
                        <span><a href="/">首页</a></span>><span><a href="/navigater">网站导航</a></span>
                    </div>
                    <h1 className="nav-bid"><div className="icon-contaner"><span className="iconfont icon-9"></span></div>招标</h1>
                    <ul className="list-row-5">
                        <li><a href="/zbxx/zbgg">招标公告</a></li>
                        <li><a href="/zbxx/bggg">变更公告</a></li>
                        <li><a href="/zbxx/zbyg">招标预告</a></li>
                        <li><a href="/zbxx/zbgs">中标公示</a></li>
                        <li><a href="/zbxx/zhongbyg">中标公告</a></li>
                        <li><a href="/zbxx/dy">答疑</a></li>
                        <li><a href="/zbxx/bx">比选</a></li>
                        <li><a href="/zbxx/zgys">资格预审</a></li>
                        <li><a href="/zbxx/zgysjg">预审结果</a></li>
                    </ul>
                    <h1 className="nav-purchase"><div className="icon-contaner"><span className="iconfont icon-6"></span></div>采购</h1>
                    <ul className="list-row-5">
                        <li><a href="/cgxx/zfcg">政府采购</a></li>
                        <li><a href="/cgxx/qycg">企业采购</a></li>
                    </ul>
                    <h1 className="nav-project"><div className="icon-contaner"><span className="iconfont icon-5"></span></div>项目</h1>
                    <ul className="list-row-5">
                        <li><a href="/xmxx/vipxm">VIP项目</a></li>
                        <li><a href="/xmxx/xmdt">项目动态</a></li>
                        <li><a href="/xmxx/xmgz">项目跟踪</a></li>
                        <li><a href="/xmxx/xmhzpf">项目核准</a></li>
                        <li><a href="/xmxx/gcsj">工程设计</a></li>
                        <li><a href="/xmxx/sgzb">施工准备</a></li>
                        <li><a href="/xmxx/zjjd">在建阶段</a></li>
                        <li><a href="/xmxx/sphc">审批核查</a></li>
                        <li><a href="/xmxx/jys">建议书阶段</a></li>
                        <li><a href="/xmxx/kxx">可行性</a></li>
                    </ul>
                    <h1 className="nav-region"><div className="icon-contaner"><span className="iconfont icon-7"></span></div>地区站</h1>
                    <ul className="list-row-6">
                        {
                            this.state.province!=null?
                                this.state.province.map((obj) => {
                                    if(obj.name !="") {
                                        return <li><a href={"/sa/"+obj.value}>{obj.name}</a></li>
                                    }
                                })
                                :null
                        }
                    </ul>
                    <Footer />
                </div>
            </div>
        )
    }
    componentDidMount() {
        util.getRequest('/province').then(
            data => {
                data.json().then(
                    json => {
                        this.setState({
                            province: json.province
                        })
                    }
                )
            }
        );
    }

    componentWillReceiveProps(nextProps) {

    }
}
function select(state) {
    return {

    }
}
let Navigater = connect(select)(component);

render(
    <Provider store={store}>
        <Navigater />
    </Provider>
    ,
    document.getElementById("navigater")
);