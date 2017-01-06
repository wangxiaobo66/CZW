/**
 * Created by wangxiaobo on 16/11/18.
 */
require('./index.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

let date = parseInt(new Date().getTime()/1000);

//引入模块
//let {Header} = require('../../component/Header/Header');
const { Header } = require('../../component/Header/Header');//头部
const { Footer } = require('../../component/Footer/Footer');//底部
const { List } = require('../../component/List/List');//每个list

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time:date,
            tenders:null,
            successful:null,
            procurement:null,
            hide:true
        }
    }
    render() {
        let {index} = this.props;
        let {tenders,successful,procurement,hide} = this.state;
        return (
            <div className="module-index">
                <Header hide={hide} />
                <div className={"Index"+(hide?'':' hide')}>
                    <div className="nav">
                        <span><a href="/">首页</a></span>
                    </div>
                    <nav className="details">
                        <a className="quick-entry-link" href="/zbxx">
                            <p className="details-item details-item-1"><span className="iconfont icon-9"></span></p>
                            <p className="title">招标</p>
                        </a>
                        <a className="quick-entry-link" href="/cgxx">
                            <p className="details-item details-item-2"><span className="iconfont icon-6"></span></p>
                            <p className="title">采购</p>
                        </a>
                        <a className="quick-entry-link" href="/xmxx">
                            <p className="details-item details-item-3"><span className="iconfont icon-5"></span></p>
                            <p className="title">项目</p>
                        </a>
                        <a className="quick-entry-link" href="/sa">
                            <p className="details-item details-item-4"><span className="iconfont icon-7"></span></p>
                            <p className="title">地区站</p>
                        </a>
                    </nav>

                    <ul className="dynamic" key="ul-tenders">
                        <h2>
                            <div className="invited icon-contaner">
                                <span className="iconfont icon-36"></span>
                            </div>
                            <span className="h2-title-province">招标信息</span>
                            <span className="more" onClick={(e) => this.click(e,'tenders')}>更多</span>
                        </h2>
                        {
                            this.state.tenders !=null ?
                                this.state.tenders.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null

                        }
                    </ul>
                    <ul className="dynamic" key="ul-successful">
                        <h2>
                            <div className="win icon-contaner">
                                <span className="iconfont icon-37"></span>
                            </div>
                            <span className="h2-title-province">中标信息</span>
                            <span className="more" onClick={(e) => this.click(e,'successful')}>更多</span>
                        </h2>
                        {
                            this.state.successful !=null ?
                                this.state.successful.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null

                        }
                    </ul>
                    <ul className="dynamic" key="ul-procurement">
                        <h2>
                            <div className="purchase icon-contaner">
                                <span className="iconfont icon-35"></span>
                            </div>
                            <span className="h2-title-province">采购信息</span>
                            <span className="more" onClick={(e) => this.click(e,'procurement')}>更多</span>
                        </h2>
                        {
                            this.state.procurement !=null ?
                                this.state.procurement.map((obj,index) => {
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
        //回调头部方法
        //this.search();
        //招标信息首页展示
        let {time} = this.state.time;
        var tendersInfo = {val:'',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:time,page:1,rp:5};
        util.postRequest('/searchList',tendersInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            tenders:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
        //中标信息首页展示
        var successfulInfo = {val:'',tablename1:5,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:time,page:1,rp:5};
        util.postRequest('/searchList',successfulInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            successful:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
        //采购信息首页展示
        var procurementInfo = {val:'',tablename1:6,tablename2:7,tablename3:'',area:'',cate:'',time:30,time2:time,page:1,rp:5};
        util.postRequest('/searchList',procurementInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            procurement:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
    componentWillReceiveProps(nextProps) {

    }
    click(e,name){
        switch (name){
            case 'tenders':
                window.location.href = '/zbxx/zbgg';
                break;
            case 'successful':
                window.location.href = '/zbxx/zbgs';
                break;
            case 'procurement':
                window.location.href = '/cgxx';
                break;
        }
    }
}
function select(state) {
    return {
        index: state.index
    }
}
let Index = connect(select)(component);

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById("index")
);