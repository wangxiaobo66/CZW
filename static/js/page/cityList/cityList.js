/**
 * Created by wangxiaobo on 16/12/27.
 */
require('./cityList.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

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
        console.log(this.state.name);
        return (

            <div className="module-list">
                <Header />

                <ul className="middle-tab">
                    <div className="nav">
                        <span><a href="/">首页</a></span>><span><a href="/sa">地区站</a></span>><span><a href={"/sa/"+(this.state.name!=null?this.state.name[0]:null)}>{this.state.val!=null?this.state.val:null}</a></span>><span><a href={"/sa/"+(this.state.name!=null?this.state.name[0]:null)+"_"+(this.state.name!=null?this.state.name[1]:null)}>{(this.state.val!=null?this.state.val:null)+(this.state.value!=null?this.state.value:null)}</a></span>
                    </div>
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
        )
    }
    componentDidMount() {
        let arr = util.UrlSearch();
        let city = arr[0];
        let name = city.split('_');
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
    total(){
        if(this.state.total!=null && page*rp<this.state.total){
            return <p className="upData-p" onClick={(e) => this.upData()}>显示更多</p>
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
                        let info = {val:val,tablename1:tablename1,tablename2:tablename2,tablename3:tablename3,tablenameone:tablenameone,tablenametwo:tablenametwo,area:area,cate:'',time:30,time2:'',page:page,rp:rp};
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