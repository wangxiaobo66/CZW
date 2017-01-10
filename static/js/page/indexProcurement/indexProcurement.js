/**
 * Created by wangxiaobo on 16/12/5.
 */
require('./indexProcurement.scss');
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
const { List } = require('../../component/List/List');

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coProcurement:null,
            govProcurement:null
        }
    }

    render() {
        return (
            <div className="module-indexProcurement">
                <Header />
                <div className="contaner">
                    <div className="nav">
                        <span><a href={(util.http())+"/"}>首页</a></span>><span><a href={(util.http())+"/cgxx"}>采购</a></span>
                    </div>
                    <ul className="dynamic">
                        <h2>
                            <span className="iconfont icon-red icon-15"></span>
                            <span className="h2-title">政府采购</span>
                            <a href={(util.http())+"/cgxx/zfcg"}>
                                <span className="more">更多</span>
                            </a>
                        </h2>
                        {
                            this.state.govProcurement!=null?
                                this.state.govProcurement.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null
                        }
                    </ul>
                    <ul className="dynamic">
                        <h2>
                            <span className="iconfont icon-red icon-19"></span>
                            <span className="h2-title">企业采购</span>
                            <a href={(util.http())+"/cgxx/qycg"}>
                                <span className="more">更多</span>
                            </a>
                        </h2>
                        {
                            this.state.coProcurement!=null?
                                this.state.coProcurement.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
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
        this.coProcurement();
        this.govProcurement();
    }

    componentWillReceiveProps(nextProps) {

    }
    coProcurement(){//企业
        let info = {val:'',tablename1:7,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:6};
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            coProcurement:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
    govProcurement(){//政府
        let info = {val:'',tablename1:6,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:6};
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            govProcurement:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
}
function select(state) {
    return {

    }
}
let IndexProcurement = connect(select)(component);

render(
    <Provider store={store}>
        <IndexProcurement />
    </Provider>
    ,
    document.getElementById("indexProcurement")
);