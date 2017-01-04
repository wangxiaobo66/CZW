/**
 * Created by wangxiaobo on 16/12/23.
 */
require('./details.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

let date = parseInt(new Date().getTime() / 1000);

const { Header } = require('../../component/Header/Header');//头部
const { Footer } = require('../../component/Footer/Footer');//底部
const { List } = require('../../component/List/List');//每个list

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time:date,
            data:null,
            province: null,
            list:null
        }
    }
    render() {
        let {data,province,list} = this.state;
        return (
            <div className="module-details">
                <Header />
                <div className="Unlisted">
                    <div className="nav">
                        <span>首页</span>><span>招标</span>><span>招标信息</span>
                    </div>
                    <ul className="dynamic nologin">
                        <li className="dynamic-list noline">
                            <h2 className="dynamic-list-title">{data!=null?data.title:null}</h2>
                            <p>
                                <span>采购与招标网 </span>
                                <span>{data!=null?data.categoryName:null}</span>
                                <span>{province != null ? data != null  ? province[data.areaId - 1].name : null:null}</span>
                                <span className="dynamic-list-time">{data!=null?util.getLocalTime(data.publishDate):''}</span>
                            </p>
                        </li>
                        {
                            data!=null?data.msession==''?
                                <div className="nologin-tip">
                                    以下内容，仅对会员开放，如需查看详细内容，请先<a href="/register"> 注册 </a>成为会员，已注册的会员请<a href="/login"> 登陆 </a>后查看。
                                </div>
                                :null
                                :null
                        }
                        <li className="dynamic-list">
                            <h1 className="dynamic-list-title">基本信息</h1>
                            <div className="dynamic-list-info co-info">
                                <p><span>招标编码：</span><span className="after-login">{data!=null?data.insideId:null}</span></p>
                                <p><span>招标编号：</span><span className="after-login">{data!=null?data.no:null}</span></p>
                                <p><span>开标时间：</span><span className="after-login">{data!=null?data.publishEndDate!=0?util.getLocalTime(data.publishEndDate):'':null}</span></p>
                                <p><span>标讯类别：</span><span className="after-login">{data!=null?data.classaName:null}</span></p>
                                <p><span>资金来源：</span><span className="after-login">{data!=null?data.classcName:null}</span></p>
                                <p><span>招标代理：</span><span className="after-login">{data!=null?data.stringa:null}</span></p>
                                <p><span>招标人：</span><span className="after-login">{data!=null?data.stringb:null}</span></p>
                            </div>
                        </li>
                        <div ref="Content" id="Content" className="Content">
                        {
                            this.detailsContent(data)
                        }
                        </div>
                        <div className="support-info">
                            免费注册会员可以查看免费信息，了解更多服务内容请进入客服中心，您在适用本网过程中，需要帮助，可以拨打下面的电话。 会员办理咨询免费注册会员可以查看免费信息，了解更多服务内容请进入客服中心，您在适用本网过程中，需要帮助，可以拨打下面的电话。 会员办理咨询
                        </div>
                        <ul>
                            <h1 className="dynamic-list-title red">相关推荐</h1>
                            {
                                list!=null?
                                    list.map((obj,index)=>{
                                        return <List obj={obj} index={index}/>
                                    })
                                    :null
                            }
                        </ul>
                    </ul>
                    {/*<a className="stick" href="">置顶</a>*/}
                    <Footer />
                </div>
            </div>
        )
    }
    componentDidMount() {
        //获取信息id
        let id = sessionStorage.getItem("id");
        //获取用户msession
        //let msession = document.cookie.replace(/(?:(?:^|.*;\s*)msession\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        let msession = sessionStorage.getItem("msession");
        this.details(id,msession);
        //获取地区列表
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
    details(id,msession){
        let info = {id:id,msession:(msession!=null?msession:'')};
        util.postRequest('/details',info).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            data:json.result
                        });
                        this.correlationList(json.result)
                    }
                )
            },
            error => {
                console.log("error");
            }
        );
    }
    detailsContent(data){
        let Content = document.getElementById('Content');
        if(data!=null){
            if(data.description!=undefined){
                Content.innerHTML=data.description;
            }else {
                Content.innerHTML=data.descriptionXXX;
            }
        }
    }
    correlationList(data){
        if(data!=null){
            let info = {val:data.title,tablename1:'',tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:1,rp:5};
            util.postRequest('/searchList',info).then(
                data => {
                    data.json().then(
                        json =>{
                            this.setState({
                                list: json.result.infos
                            })
                        }
                    )
                }
            )
        }
    }
}
function select(state) {
    return {
    }
}
let Details = connect(select)(component);

render(
    <Provider store={store}>
        <Details />
    </Provider>,
    document.getElementById("details")
);