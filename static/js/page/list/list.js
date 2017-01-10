/**
 * Created by wangxiaobo on 16/12/23.
 */
require('./list.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;
//const DocumentMeta = require('react-document-meta');
const DocMeta = require('react-doc-meta');//meta
const DocumentTitle = require('react-document-title');//title

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

const { Header } = require('../../component/Header/Header');//头部
const { List } = require('../../component/List/List');//每个list

let page = 1,rp = 20;
class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:null,
            total:null,
            name:null,
            val:null,
            nValue:null,
            vValue:null
        }
    }

    render() {
        let {val,name,nValue,vValue} = this.state;
        let tags = [
            {name: "keywords", content:nValue+","+nValue+"网"},

            {name: "description", content: (val=="zbxx"?nValue+"频道为您提供全面的"+nValue+"相关信息,工程建设招标,工程项目招标,装饰招标,绿化招标,建筑设计招标,采购公告,拟建项目等信息!更多相关资讯,详询采购与招标网.":
                                                val=="cgxx"?nValue+"频道为您提供全面的"+nValue+"相关信息,2016年政府采购动态,现状,"+nValue+"项目,订单,资金,政策,流程等!更多相关资讯,详询采购与招标网.":
                                                    val=="xmxx"?"采购与招标网是权威的中国招投标门户网站,国内领先的建设项目信息服务,为企业提供"+nValue+",项目报告,国外商机,项目动态,项目追踪服务及专业招标、采购、拟在建项目信息.":
                                                        null)}
        ];

        return (
            <div className="module-list">
                <DocumentTitle title={val!="xmxx"?nValue+"_"+nValue+"网":nValue}/>
                <DocMeta tags={tags} />
                <Header />
                <div className="middle-tab">
                    <div className="nav">
                        <span><a href={(util.http())+"/"}>首页</a></span>><span><a href={(util.http())+"/"+(val!=null?val:null)}>{vValue!=null?vValue:null}</a></span>><span><a href={(util.http())+"/"+(val!=null?val:null)+"/"+(name!=null?name:null)}>{nValue!=null?nValue:null}</a></span>
                    </div>
                    <ul>
                        {
                            this.state.list!=null?
                                this.state.list.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null
                        }
                    </ul>
                    {
                        this.total()
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        let arr = util.UrlSearch();
        let name = arr[0];
        let val = arr[1];
        this.stageVal(val);
        this.stageName(name);
        this.setState({
            name:name,
            val:val
        });
        switch (val){
            case 'zbxx':
                //招标信息
                this.tenders(name);
                break;
            case 'cgxx':
                //采购信息
                this.procurement(name);
                break;
            case 'xmxx':
                //项目信息
                this.project(name);
                break;
        }
    }
    componentWillReceiveProps(nextProps) {

    }
    stageVal(val){
        switch (val){
            case 'zbxx':
                this.setState({
                    vValue:'招标信息'
                });
                break;
            case 'cgxx':
                this.setState({
                    vValue:'采购信息'
                });
                break;
            case 'xmxx':
                this.setState({
                    vValue:'项目信息'
                });
                break;
        }
    }
    stageName(name){
        switch (name){
            //招标
            case 'zbgg':
                this.setState({
                    nValue:'招标公告'
                });
                break;
            case 'bggg':
                this.setState({
                    nValue:'变更公告'
                });
                break;
            case 'zbyg':
                this.setState({
                    nValue:'招标预告'
                });
                break;
            case 'zbgs':
                this.setState({
                    nValue:'中标公示'
                });
                break;
            case 'zhongbyg':
                this.setState({
                    nValue:'中标预告'
                });
                break;
            case 'dy':
                this.setState({
                    nValue:'答疑'
                });
                break;
            case 'bx':
                this.setState({
                    nValue:'比选'
                });
                break;
            case 'zgys':
                this.setState({
                    nValue:'资质审核'
                });
                break;
            case 'zgysjg':
                this.setState({
                    nValue:'预审结果'
                });
                break;
            case 'gczb':
                this.setState({
                    nValue:'工程招标'
                });
                break;
            case 'hwzb':
                this.setState({
                    nValue:'货物招标'
                });
                break;
            case 'fwzb':
                this.setState({
                    nValue:'服务招标'
                });
                break;
            //采购
            case 'zfcg':
                this.setState({
                    nValue:'政府采购'
                });
                break;
            case 'qycg':
                this.setState({
                    nValue:'企业采购'
                });
                break;
            //项目
            case 'vipxm':
                this.setState({
                    nValue:'VIP项目'
                });
                break;
            case 'xmdt':
                this.setState({
                    nValue:'项目动态'
                });
                break;
            case 'xmgz':
                this.setState({
                    nValue:'项目跟踪'
                });
                break;
            case 'xmhzpf':
                this.setState({
                    nValue:'项目核准'
                });
                break;
            case 'gcsj':
                this.setState({
                    nValue:'工程设计'
                });
                break;
            case 'sgzb':
                this.setState({
                    nValue:'施工准备'
                });
                break;
            case 'zjjd':
                this.setState({
                    nValue:'在建阶段'
                });
                break;
            case 'sphc':
                this.setState({
                    nValue:'审批核查'
                });
                break;
            case 'jys':
                this.setState({
                    nValue:'建议书阶段'
                });
                break;
            case 'kxx':
                this.setState({
                    nValue:'可行性研究'
                });
                break;
        }
    }

    total(){
        if(this.state.total!=null && page*rp<this.state.total){
            return <p className="upData-p" onClick={(e) => this.upData()}>显示更多</p>
        }else {
            return null
        }
    }
    upData(){
        page = page +1 ;
        let {val,name} = this.state;
        if (val!=null){
            switch (val){
                case 'zbxx':
                    //招标信息
                    this.tenders(name);
                    break;
                case 'cgxx':
                    //采购信息
                    this.procurement(name);
                    break;
                case 'xmxx':
                    //项目信息
                    this.project(name);
                    break;
            }
        }
    }
    tenders(name){//招标信息
        let info;
        switch (name){
            case 'zbgg':
                info = {val:'',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'bggg':
                info = {val:'变更',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'zbyg':
                info = {val:'',tablename1:4,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'zbgs':
                info = {val:'',tablename1:5,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'zhongbyg':
                info = {val:'预告',tablename1:5,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'dy':
                info = {val:'答疑',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'bx':
                info = {val:'比选',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'zgys':
                info = {val:'资质审核',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'zgysjg':
                info = {val:'预审结果',tablename1:1,tablename2:2,tablename3:3,area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'gczb':
                info = {val:'',tablename1:1,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'hwzb':
                info = {val:'',tablename1:2,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'fwzb':
                info = {val:'',tablename1:3,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
        }
        //发送请求
        this.post(info);
    }
    procurement(name){//采购信息
        let info;
        switch (name){
            case 'zfcg':
                info = {val:'',tablename1:6,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
            case 'qycg':
                info = {val:'',tablename1:7,tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
                break;
        }
        //发送请求
        this.post(info);
    }
    project(name){//项目信息
        let info;
        switch (name){
            case 'vipxm':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3030',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'xmdt':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3050',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'xmgz':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3070',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'xmhzpf':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'3020',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;

            case 'gcsj':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'6',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'sgzb':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'10',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'zjjd':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'11',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'sphc':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'4',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'jys':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'2',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;
            case 'kxx':
                info = {val:'',tablename1:'',tablename2:'',tablename3:'',tablenameone:'3000',tablenametwo:'',classbid:'3',area:'',cate:'',time:365,time2:'',page:page,rp:rp};
                break;

        }
        //发送请求
        this.post(info);
    }
    post(info){
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{
                        let {list} = this.state;
                        if (list==null){
                            this.setState({
                                list: json.result.infos
                            })
                        }else {
                            list = list.concat(json.result.infos);
                            this.setState({
                                list: list
                            })
                        }
                        this.setState({
                            total:json.result.total
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
let Mlist = connect(select)(component);

render(
    <Provider store={store}>
        <Mlist />
    </Provider>,
    document.getElementById("list")
);