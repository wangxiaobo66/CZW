/**
 * Created by wangxiaobo on 16/12/27.
 */
require('./cityList.scss');
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

const { Header } = require('../../component/Header/Header');//头部
const { List } = require('../../component/List/List');//每个list

let page = 1,rp = 20;
class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            area:null,
            val:null,
            list:null,
            total:null,
            tablename1:'',
            tablename2:'',
            tablename3:'',
            tablenameone:'',
            tablenametwo:'',
            name:null,
            value:null
        }
    }
    render() {
        let {val,name} = this.state;
        let tags = [
            {name:"keywords",content:(name!=null?name[1]==("zbxx"||"zbgg")?(val+"招标公告"):
                                            name[1]=="zbgs"?(val+"中标公示"):
                                                name[1]=="cgxx"?(val+"政府采购中心"):
                                                    name[1]=="vipxm"?(val+"VIP项目"):
                                                        null:
                                                        null
            )},
            {name:"description",content:(name!=null?name[1]==("zbxx"||"zbgg")?(val+"【"+val+"招标公告】是采购与招标网旗下栏目,"+val+"采购与招标网提供了"+val+"招标公告,"+val+"政府采购,建设工程招标及拟在建项目信息,更多招投标,政府采购信息请关注"+val+"采购与招标网."):
                                                name[1]=="zbgs"?(val+"中标公示为您提供"+val+"政府采购公告,"+val+"企业采购,政府采购规定,需求报告,招标合同等"+val+"政府采购信息,更多"+val+"招标网政府采购信息请关注"+val+"采购与招标网."):
                                                    name[1]=="cgxx"?(val+"政府采购中心为您提供"+val+"政府采购公告,"+val+"企业采购,政府采购规定,需求报告,招标合同等"+val+"政府采购信息,更多"+val+"招标网政府采购信息请关注"+val+"采购与招标网."):
                                                        name[1]=="vipxm"?(val+"VIP项目为您提供"+val+"政府采购公告,"+val+"企业采购,政府采购规定,需求报告,招标合同等"+val+"政府采购信息,更多"+val+"招标网政府采购信息请关注"+val+"采购与招标网."):
                                                            null:
                                                            null
            )}
        ];
        return (
            <div className="module-list">
                <DocumentTitle title={name!=null?name[1]==("zbxx"||"zbgg")?(val+"招标公告_"+val+"采购与招标网"):
                                           name[1]=="zbgs"?(val+"中标公示_"+val+"采购与招标网"):
                                                name[1]=="cgxx"?(val+"政府采购中心_"+val+"采购与招标网"):
                                                     name[1]=="vipxm"?(val+"VIP项目_"+val+"采购与招标网"):
                                                        null:
                                                        null
                                        }/>
                <DocMeta tags={tags} />
                <Header />
                <ul className="middle-tab">
                    <div className="nav">
                        <span><a href={(util.http())+"/"}>首页</a></span>><span><a href={(util.http())+"/sa"}>地区站</a></span>><span><a href={(util.http())+"/sa/"+(this.state.name!=null?this.state.name[0]:null)}>{this.state.val!=null?this.state.val:null}</a></span>><span><a href={"/sa/"+(this.state.name!=null?this.state.name[0]:null)+"_"+(this.state.name!=null?this.state.name[1]:null)}>{(this.state.val!=null?this.state.val:null)+(this.state.value!=null?this.state.value:null)}</a></span>
                    </div>
                    {
                        this.state.list!=null?
                            this.state.list.map((obj,index) => {
                                return <List obj={obj} index={index}/>
                            })
                            :null
                    }
                </ul>
                <div className="list-page">
                    {
                        this.total(page,name)
                    }
                </div>
            </div>
        )
    }
    componentDidMount() {
        let arr = util.UrlSearch();
        let city = arr[0];
        let name = city.split('_');
        page = name[2];
        if (page==undefined){
            page = 1;
        }

        util.getRequest('/city').then(
            data => {
                data.json().then(
                    json => {
                        this.list(name,json.city);
                    }
                )
            }
        );

    }
    componentWillReceiveProps(nextProps) {

    }
    total(page,name){
        if(this.state.total!=null){
            let divPage = [],lage = 0,total = Math.ceil(this.state.total/20);
            if(total==1){

            }else if(total<=5){
                for (var i=0;i<total;i++) {
                    divPage.push(<a href={(util.http())+"/"+val+"/"+name+"_"+(i+1)}
                                    className={"page-one page-a"+(page==(i+1)?" active":"")}>{i + 1}</a>)
                }
            }else if(total>5){
                if(page<=3){
                    for (var i=0;i<total;i++) {
                        lage++;
                        if (lage == 4) {
                            break;
                        }
                        divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(i+1)}
                                        className={"page-one page-a"+(page==(i+1)?" active":"")}>{i + 1}</a>)
                    }
                    divPage.push(<a className="omit-a">...</a>);
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(total)} className={"page-one page-a"+(page==(total)?" active":"")}>{total}</a>);//最后一页
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(parseInt(page)+1)} className="page-one page-a next-a">下一页</a>);//下一页
                }else if(page>total-3){
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(parseInt(page)-1)} className="page-one page-a next-a">上一页</a>);//上一页
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_1"} className={"page-one page-a"+(page==1?" active":"")}>1</a>);//第一页
                    divPage.push(<a className="omit-a">...</a>);
                    for (var i=total-3;i<total;i++){
                        lage++;
                        if (lage == 4){
                            break;
                        }
                        divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(i+1)}
                                        className={"page-one page-a"+(page==(i+1)?" active":"")}>{i+1}</a>)
                    }
                }else {
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(parseInt(page)-1)} className="page-one page-a next-a">上一页</a>);//上一页
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_1"} className={"page-one page-a"+(page==1?" active":"")}>1</a>);//第一页
                    divPage.push(<a className="omit-a">...</a>);
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+page} className="page-one page-a active">{page}</a>);
                    divPage.push(<a className="omit-a">...</a>);
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(total)} className={"page-one page-a"+(page==(total)?" active":"")}>{total}</a>);//最后一页
                    divPage.push(<a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_"+(parseInt(page)+1)} className="page-one page-a next-a">下一页</a>);//下一页
                }
            }
            return divPage;
            //return <div className="list-page"><a href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_1"} className={"page-one page-a"+(page==1?" active":"")}>1</a><a  href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_2"} className={"page-two page-a"+(page==2?" active":"")}>2</a><a  href={(util.http())+"/sa/"+name[0]+"_"+name[1]+"_3"} className={"page-three page-a"+(page==3?" active":"")}>3</a></div>
        }else {
            return null
        }
    }
    upData(){
        let {val,area,tablename1,tablename2,tablename3,tablenameone,tablenametwo} = this.state;
        page = page + 1;
        let info = {val:val,tablename1:tablename1,tablename2:tablename2,tablename3:tablename3,tablenameone:tablenameone,tablenametwo:tablenametwo,area:area,cate:'',time:30,time2:'',page:page,rp:rp};
        this.post(info)
    }
    list(name,city){
            city.map((obj,index) => {
                obj.city.map((itm,i) => {
                    if(itm.value == name[0]){
                        let  area=index+1,val = itm.name,tablename1='',tablename2='',tablename3='',tablenameone='',tablenametwo='';
                        switch (name[1]){
                            case 'zbxx':
                                tablename1=1;
                                tablename2=2;
                                tablename3=3;
                                this.setState({
                                    value:"招标信息"
                                });
                                break;
                            case 'zbgg':
                                tablename1=1;
                                tablename2=2;
                                tablename3=3;
                                this.setState({
                                    value:"招标公告"
                                });
                                break;
                            case 'zbgs':
                                tablename1=5;
                                this.setState({
                                    value:"中标公示"
                                });
                                break;
                            case 'cgxx':
                                tablename1=6;
                                tablename2=7;
                                this.setState({
                                    value:"采购信息"
                                });
                                break;
                            case 'vipxm':
                                tablenameone='3000';
                                tablenametwo='3030';
                                this.setState({
                                    value:"VIP项目"
                                });
                                break;
                        }
                        this.setState({
                            val:val,
                            name:name,
                            area:area,
                            tablename1:tablename1,
                            tablename2:tablename2,
                            tablename3:tablename3,
                            tablenameone:tablenameone,
                            tablenametwo:tablenametwo
                        });
                        //请求list
                        let info = {val:val,tablename1:tablename1,tablename2:tablename2,tablename3:tablename3,tablenameone:tablenameone,tablenametwo:tablenametwo,area:area,cate:'',time:365,time2:'',page:page,rp:rp};
                        this.post(info)
                    }
                })
            })
    }
    post(info){
        let {list} = this.state;
        if (list==null){
            util.postRequest('/searchList',info).then(
                data => {
                    data.json().then(
                        json =>{
                            this.setState({
                                list: json.result.infos,
                                total:json.result.total
                            })
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }else{
            util.postRequest('/searchList',info).then(
                data => {
                    data.json().then(
                        json =>{
                            list = list.concat(json.result.infos);
                            this.setState({
                                list: list,
                                total:json.result.total
                            })
                        }
                    )
                },
                error => {
                    console.log("error");
                }
            )
        }
        /*
        util.postRequest('/searchList',info).then(
            data => {
                data.json().then(
                    json =>{

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
        */
    }
}
function select(state) {
    return {
    }
}
let Clist = connect(select)(component);

render(
    <Provider store={store}>
        <Clist />
    </Provider>,
    document.getElementById("cityList")
);