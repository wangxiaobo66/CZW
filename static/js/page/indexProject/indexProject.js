/**
 * Created by wangxiaobo on 16/12/2.
 */
require('./indexProject.scss');
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
            pick:true,
            list:null
        }
    }

    render() {
        return (
            <div className="module-indexProject">
                <Header />
                <div className="Projcet">
                    <div className="nav">
                        <span><a href={(util.http())+"/"}>首页</a></span>><span><a href={(util.http())+"/xmxx"}>项目</a></span>
                    </div>
                    <nav className="details">
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/vipxm"}>
                            <p className="details-item details-item-1"><span className="iconfont icon-8"></span></p>
                            <p>VIP项目</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/xmdt"}>
                            <p className="details-item details-item-2"><span className="iconfont icon-4"></span></p>
                            <p>项目动态</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/xmgz"}>
                            <p className="details-item details-item-3"><span className="iconfont icon-3"></span></p>
                            <p>项目跟踪</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/xmhzpf"}>
                            <p className="details-item details-item-4"><span className="iconfont icon-2"></span></p>
                            <p>项目核准</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/gcsj"}>
                            <p className="details-item details-item-5"><span className="iconfont icon-33"></span></p>
                            <p>工程设计</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/sgzb"}>
                            <p className="details-item details-item-6"><span className="iconfont icon-30"></span></p>
                            <p>施工准备</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/zjjd"}>
                            <p className="details-item details-item-7"><span className="iconfont icon-32"></span></p>
                            <p>再建阶段</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/sphc"}>
                            <p className="details-item details-item-8"><span className="iconfont icon-31"></span></p>
                            <p>审批核查</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/jys"}>
                            <p className="details-item details-item-9"><span className="iconfont icon-29"></span></p>
                            <p>建议书阶段</p>
                        </a>
                        <a className="quick-entry-link" href={(util.http())+"/xmxx/kxx"}>
                            <p className="details-item details-item-10"><span className="iconfont icon-28"></span></p>
                            <p>可行性</p>
                        </a>
                    </nav>

                    <ul className="dynamic">
                        <div className="nav-contaner">
                            <nav className="dynamic-nav">
                                <a className={this.state.pick?"red-white":"white-red"} href="javascript:;" onClick={(e) => this.click('vip')}>VIP项目</a>
                                <a className={this.state.pick?"white-red":"red-white"} href="javascript:;" onClick={(e) => this.click('xmdt')}>项目动态</a>
                            </nav>
                        </div>
                        {
                            this.state.list!=null ?
                                this.state.list.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null
                        }
                        <a className="more white-red" href={(util.http())+"/xmxx/vipxm"}>查看更多VIP项目</a>
                    </ul>
                    <Footer />
                </div>
            </div>
        )
    }
    componentDidMount() {
        let {pick} = this.state;
        this.list(pick);
    }

    componentWillReceiveProps(nextProps) {

    }
    click(name){
        switch (name){
            case 'vip':
                this.setState({
                    pick:true
                });
                this.list(true);
                break;
            case 'xmdt':
                this.setState({
                    pick:false
                });
                this.list(false);
                break;
        }
    }
    list(pick){
        let info;
        if(pick){
            info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3030',area:'',cate:'',time:365,time2:'',page:1,rp:6};
        }else {
            info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3050',area:'',cate:'',time:365,time2:'',page:1,rp:6};
        }
        util.postRequest('/searchList',info).then(
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
let IndexProject = connect(select)(component);

render(
    <Provider store={store}>
        <IndexProject />
    </Provider>
    ,
    document.getElementById("indexProject")
);