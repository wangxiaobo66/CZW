/**
 * Created by wangxiaobo on 16/12/23.
 */
require('./list.scss');
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
            list:null,
            total:null,
            name:null,
            val:null
        }
    }

    render() {
        return (
            <div className="module-list">
                <Header />
                <div className="middle-tab">
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