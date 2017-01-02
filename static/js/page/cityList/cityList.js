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
            total:null
        }
    }
    render() {
        return (
            <div className="module-list">
                <Header />
                <ul className="middle-tab">
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
        let name = arr[0];
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
        let {val,area} = this.state;
        page = page + 1;
        let info = {val:val,tablename1:'',tablename2:'',tablename3:'',area:area,cate:'',time:30,time2:'',page:page,rp:rp};
        this.post(info)
    }
    list(name,city){
        console.log(city);
            city.map((obj,index) => {
                obj.city.map((itm,i) => {
                    if(itm.value == name){
                        let  area=index+1,val = itm.name;
                        this.setState({
                            val:val,
                            area:area
                        });
                        //请求list
                        let info = {val:val,tablename1:'',tablename2:'',tablename3:'',area:area,cate:'',time:30,time2:'',page:page,rp:rp};
                        this.post(info)
                    }
                })
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