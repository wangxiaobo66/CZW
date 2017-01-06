/**
 * Created by wangxiaobo on 16/12/5.
 */
require('./indexTenders.scss');
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
const { List } = require('../../component/List/List');//每个list

let date = parseInt(new Date().getTime()/1000);

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:null,
            bidTenders:true,
            bidGoods:false,
            bidService:false
        }
    }
    render() {
        return(
            <div className="module-indexTenders">
                <Header />
                <div className="Bid">
                    <div className="nav">
                        <span><a href="/">首页</a></span>><span>招标</span>
                    </div>

                    <div className="topnav cl">
                        <a className="quick-entry-link" href="/zbxx/zbgg">
                            <p className="details-item details-item-1"><span className="iconfont icon-9"></span></p>
                            <p>招标公告</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/bggg">
                            <p className="details-item details-item-2"><span className="iconfont icon-31"></span></p>
                            <p>变更公告</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/zbyg">
                            <p className="details-item details-item-3"><span className="iconfont icon-1"></span></p>
                            <p>招标预告</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/zbgs">
                            <p className="details-item details-item-4"><span className="iconfont icon-23"></span></p>
                            <p>中标公示</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/zhongbyg">
                            <p className="details-item details-item-5"><span className="iconfont icon-25"></span></p>
                            <p>中标公告</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/dy">
                            <p className="details-item details-item-6"><span className="iconfont icon-24"></span></p>
                            <p>答疑</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/bx">
                            <p className="details-item details-item-7"><span className="iconfont icon-22"></span></p>
                            <p>比选</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/zgys">
                            <p className="details-item details-item-8"><span className="iconfont icon-20"></span></p>
                            <p>资格预审</p>
                        </a>
                        <a className="quick-entry-link" href="/zbxx/zgysjg">
                            <p className="details-item details-item-9"><span className="iconfont icon-21"></span></p>
                            <p>预审结果</p>
                        </a>
                    </div>


                    <div className="middle-tab">
                        <nav>
                            <h2><nav className="title">最新招标公告</nav></h2>
                            <div className="tab-lable">
                                <span className={"bid-tenders" + (this.state.bidTenders?" curr":"")} onClick={(e) => this.click(e,"tenders")}>工程招标</span>
                                <span className={"bid-goods" + (this.state.bidGoods?" curr":"")} onClick={(e) => this.click(e,"goods")}>货物招标</span>
                                <span className={"bid-service" + (this.state.bidService?" curr":"")} onClick={(e) => this.click(e,"service")}>服务招标</span>
                            </div>
                        </nav>
                        <ul>
                            {
                                this.state.list != null ?
                                    this.state.list.map((obj,index) => {
                                        return <List obj={obj} index={index}/>
                                    })
                                    :null
                            }
                        </ul>
                    </div>
                    <Footer/>
                </div>
            </div>
        )
    }
    componentDidMount() {
        //初始状态
        var tendersInfo = {val:'',tablename1:1,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:8};
        util.postRequest('/searchList',tendersInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            list:json.result.infos
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
            case "tenders":
                this.setState({
                    bidTenders:true,
                    bidGoods:false,
                    bidService:false
                });
                this.tendersList();
                break;
            case "goods":
                this.setState({
                    bidTenders:false,
                    bidGoods:true,
                    bidService:false
                });
                this.goodsList();
                break;
            case "service":
                this.setState({
                    bidTenders:false,
                    bidGoods:false,
                    bidService:true
                });
                this.serviceList();
                break;
        }
    }
    tendersList(){
        var tendersInfo = {val:'',tablename1:1,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:8};
        util.postRequest('/searchList',tendersInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            list:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
    goodsList(){
        var tendersInfo = {val:'',tablename1:2,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:8};
        util.postRequest('/searchList',tendersInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            list:json.result.infos
                        });
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
    serviceList(){
        var tendersInfo = {val:'',tablename1:3,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:8};
        util.postRequest('/searchList',tendersInfo).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            list:json.result.infos
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
let IndexTenders = connect(select)(component);

render(
    <Provider store={store}>
        <IndexTenders />
    </Provider>,
    document.getElementById("indexTenders")
);