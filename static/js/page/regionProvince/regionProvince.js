/**
 * Created by wangxiaobo on 16/12/4.
 */
require('./regionProvince.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const DocMeta = require('react-doc-meta');//meta
const DocumentTitle = require('react-document-title');//title

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

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:null,
            NAME:null,
            listZb:null,
            listCg:null,
            val:null
        }
    }
    render() {
        let {name,val,listZb,listCg,NAME}=this.state;
        let tags = [
            {name: "keywords", content: val+"招标网,"+val+"政府采购,"+val+"采购与招标网"},
            {name: "description", content: "【"+val+"招标网】是最全最新广西招标采购中心提供了广西招标公告,"+val+"政府采购,建设工程招标及拟在建项目信息,更多"+val+"招标网,政府采购信息请关注"+val+"采购与招标网."}
        ];
        return (
            <div className="module-regionProvince">
                <DocumentTitle title={val+"招标网_"+val+"采购_"+val+"采购与招标网"}/>
                <DocMeta tags={tags} />
                <Header />
                <div className="Province">
                    <div className="nav">
                        <span><a href="/">首页</a></span>><span><a href="/sa">地区站</a></span>><span><a href={"/sa/"+(name!=null?name:null)}>{val!=null?val:null}</a></span>
                    </div>
                    <div className="banner">
                        <div className="banner-title"><img src="../img/banner.jpg"></img>
                            <p className="title-province">{(NAME!=null?NAME:null)+' BIDDING'}</p>
                            <p className="subheading-province">{(val!=null?val:null)+"招标"}</p>
                        </div>
                    </div>
                    <nav className="details">
                        <a className="quick-entry-link" href={"/sa/"+(name!=null?name:null)+"_zbxx"}>
                            <p className="details-item details-item-1"><span className="iconfont icon-9"></span></p>
                            <p>{(val!=null?val:null)+"招标"}</p>
                        </a>
                        <a className="quick-entry-link" href={"/sa/"+(name!=null?name:null)+"_zbgs"}>
                            <p className="details-item details-item-2"><span className="iconfont icon-6"></span></p>
                            <p>{(val!=null?val:null)+"中标"}</p>
                        </a>
                        <a className="quick-entry-link" href={"/sa/"+(name!=null?name:null)+"_cgxx"}>
                            <p className="details-item details-item-3"><span className="iconfont icon-5"></span></p>
                            <p>{(val!=null?val:null)+"采购"}</p>
                        </a>
                        <a className="quick-entry-link" href={"/sa/"+(name!=null?name:null)+"_vipxm"}>
                            <p className="details-item details-item-4"><span className="iconfont icon-8"></span></p>
                            <p>{(val!=null?val:null)+"VIP项目"}</p>
                        </a>
                    </nav>

                    <ul className="dynamic">
                        <h2>
                            <span className="h2-title-province">{(val!=null?val:null)+"招标公告"}</span>
                            <span className="more"><a href={"/sa/"+(name!=null?name:null)+"_zbgg"}>更多</a></span>
                        </h2>
                        {
                            listZb!=null?
                                listZb.map((obj,index)=>{
                                    return <List obj={obj} index={index}/>
                                })
                            :null
                        }
                    </ul>
                    <ul className="dynamic">
                        <h2>
                            <span className="h2-title-province">{(val!=null?val:null)+"采购信息"}</span>
                            <span className="more"><a href={"/sa/"+(name!=null?name:null)+"_cgxx"}>更多</a></span>
                        </h2>
                        {
                            listCg!=null?
                                listCg.map((obj,index)=>{
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
        let arr = util.UrlSearch();
        let name = arr[0];
        let NAME = name.toUpperCase();
        util.getRequest('/city').then(
            data => {
                data.json().then(
                    json => {
                        this.list(name,json.city);
                    }
                )
            }
        );
        this.setState({
            name:name,
            NAME:NAME
        })
    }

    componentWillReceiveProps(nextProps) {

    }
    list(name,city){
        city.map((obj,index) => {
            obj.city.map((itm,i) => {
                if(itm.value == name){
                    let  area=index+1,val = itm.name;
                    let infoZbgg={val:val,tablename1:1,tablename2:2,tablename3:3,area:area,cate:'',time:30,time2:'',page:1,rp:5};
                    let infoCgxx={val:val,tablename1:6,tablename2:7,tablename3:'',area:area,cate:'',time:30,time2:'',page:1,rp:5};
                    this.zbPost(infoZbgg);
                    this.cgPost(infoCgxx);
                    this.setState({
                        val:val
                    })
                }
            })
        })
    }
    zbPost(info){
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            listZb: json.result.infos
                        })
                    }
                )
            },
            error => {
                console.log("error");
            }
        )
    }
    cgPost(info){
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{
                        this.setState({
                            listCg: json.result.infos
                        })
                    }
                )
            },
            error => {
                console.log("error");
            }
        )
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