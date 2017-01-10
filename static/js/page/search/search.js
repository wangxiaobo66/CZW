/**
 * Created by wangxiaobo on 16/12/31.
 */
require('./search.scss');
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

const { SearchHeader } = require('../../component/SearchHeader/SearchHeader');//头部
const { List } = require('../../component/List/List');//每个list

let page = 1,rp = 20;
class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history:null,
            list:null,
            hide:true,
            total:null,
            val:''
        }
    }

    render() {
        let {history} = this.state;
        return (
            <div className="module-search">
                <div className="Search">
                    <div className="top-search">
                        <div className="search-container">
                            <a className="serch-btn" href="javascript:;" onClick={(e) => this.click()}><img src="../img/search.png"/></a>
                            <form action="javascript:;">
                                <input className="search-input"
                                       ref="Search"
                                       value={this.state.val}
                                       type="text" name=""
                                       placeholder="请输入与你要搜索的内容"
                                       onChange={(e) => this.change(e)}/>
                            </form>
                        </div>
                        <a className="cancel" href={(util.http())+"/"}>取消</a>
                    </div>
                    <ul className={"ul-search limit-5" + (this.state.hide?'':' hide')}>
                        {
                            history!=null?
                                history.map((obj) => {
                                    return <li onClick={(e) => this.historyClick(obj)}>{obj}</li>
                                })
                            :null
                        }
                        <a className="btn btn-delete" href="javascript:;" onClick={(e) => this.clear(this.state.history)}>{this.state.history!=null?"删除历史记录":"暂无历史记录"}</a>
                    </ul>
                    <ul className={this.state.hide?'hide':''}>
                        {
                            this.state.list!=null?
                                this.state.list.map((obj,index) => {
                                    return <List obj={obj} index={index}/>
                                })
                                :null
                        }
                        {
                            this.total()
                        }
                    </ul>
                </div>
            </div>
        )
    }

    componentDidMount() {
        let _this = this;
        //获取历史记录
        let history = localStorage.getItem("history");
        document.onkeydown = function (event) {
            history = localStorage.getItem("history");
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 13) { // enter 键
                _this.refs.Search.blur();
                let {val} = _this.state;
                if(val!=''){
                    page = 1;
                    _this.list(val);
                    _this.setState({
                        hide:false
                    });
                    //存储为历史记录
                    if (history==null){
                        localStorage.setItem("history", val);
                        let History = val.split(",");
                        _this.setState({
                            history:History
                        });
                    }else {
                        history = history + ',' + val;
                        console.log(history);
                        localStorage.setItem("history", history);
                        let History = history.split(",");
                        History = util.Array(History);
                        if(History.length>5){
                            History.shift();
                            _this.setState({
                                history:History
                            });
                            History.join(',');
                            localStorage.setItem("history", History);
                        }else {
                            _this.setState({
                                history:History
                            });
                            History.join(',');
                            localStorage.setItem("history", History);
                        }
                    }

                }
            }
        };
        if(history!=null){
            let History = history.split(",");
            History = util.Array(History);
            this.setState({
                history:History
            });
        }
    }
    componentWillReceiveProps(nextProps) {

    }
    clear(history){
        if(history!=null){
            localStorage.clear();
        }
        this.setState({
            history:null
        })
    }
    historyClick(obj){
        page = 1;
        this.list(obj);
        this.setState({
            hide:false,
            val:obj
        });
    }
    click(){
        let {val} = this.state;
        if(val!=''){
            this.list(val);
            this.setState({
                hide:false
            })
        }
    }
    total(){
        if(this.state.total!=null && page*rp<this.state.total){
            return <p className="upData-p" onClick={(e) => this.upData()}>显示更多</p>
        }else {
            return null
        }
    }
    upData() {
        let { val } = this.state;
        page = page + 1;
        let info = {val:val,tablename1:'',tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
        this.post(info);
    }
    list(val){
        let info = {val:val,tablename1:'',tablename2:'',tablename3:'',area:'',cate:'',time:30,time2:'',page:page,rp:rp};
        this.post(info);
    }
    change(e){
        let val = e.target.value;
        this.setState({
            val:val,
            hide:true,
            list:null
        })
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
    return {}
}
let Search = connect(select)(component);

render(
    <Provider store={store}>
        <Search />
    </Provider>,
    document.getElementById("search")
);