/**
 * Created by wangxiaobo on 16/12/4.
 */
require('./indexRegion.scss');
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

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curr:null,
            city:null
        }
    }

    render() {
        return(
            <div className="module-indexRegion">
                <Header />
                <div className="Region">
                    <div className="nav">
                        <span>首页</span>><span>地区站</span>
                    </div>
                    <ul className="dynamic">
                        <li>
                            <h1>华东</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('2')} className={this.state.curr == 2?"curr":""}>上海
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('2')
                                                :null
                                        }
                                    </ul>
                                </li>

                                <li onClick = {(e) => this.click('11')} className={this.state.curr == 11?"curr":""}>江苏
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('11')
                                                :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('12')} className={this.state.curr == 12?"curr":""}>浙江
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                               this.cityList('12')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('13')} className={this.state.curr == 13?"curr":""}>安徽
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('13')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('14')} className={this.state.curr == 14?"curr":""}>福建
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('14')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('15')} className={this.state.curr == 15?"curr":""}>江西
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('15')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('16')} className={this.state.curr == 16?"curr":""}>山东
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('16')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <h1>华北</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('1')} className={this.state.curr == 1?"curr":""}>北京
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('1')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('3')} className={this.state.curr == 3?"curr":""}>天津
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('3')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('5')} className={this.state.curr == 5?"curr":""}>河北
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('5')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('6')} className={this.state.curr == 6?"curr":""}>山西
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('6')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('7')} className={this.state.curr == 7?"curr":""}>内蒙古
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('7')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <h1>西南</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('4')} className={this.state.curr == 4?"curr":""}>重庆
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('4')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('27')} className={this.state.curr == 27?"curr":""}>四川
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('27')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('23')} className={this.state.curr == 23?"curr":""}>贵州
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('23')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('24')} className={this.state.curr == 24?"curr":""}>云南
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('24')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('25')} className={this.state.curr == 25?"curr":""}>西藏
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('25')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <h1>东北</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('8')} className={this.state.curr == 8?"curr":""}>辽宁
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('8')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('9')} className={this.state.curr == 9?"curr":""}>吉林
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('9')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('10')} className={this.state.curr == 10?"curr":""}>黑龙江
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('10')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <h1>华南</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('20')} className={this.state.curr == 20?"curr":""}>广东
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('20')
                                            :null
                                        }
                                        {/*
                                        <li><a className="/sa/">广东省招标</a></li>
                                        */}
                                    </ul>
                                </li>
                                <li onClick = {(e) => this.click('21')} className={this.state.curr == 21?"curr":""}>广西
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('21')
                                            :null
                                        }
                                    </ul>
                                </li>
                                <li onClick = {(e) => this.click('22')} className={this.state.curr == 22?"curr":""}>海南
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('22')
                                            :null
                                        }
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <h1>华中</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('17')} className={this.state.curr == 17?"curr":""}>河南
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('17')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('18')} className={this.state.curr == 18?"curr":""}>湖北
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('18')
                                            :null
                                        }
                                    </ul>
                                </li>
                                <li onClick = {(e) => this.click('19')} className={this.state.curr == 19?"curr":""}>湖南
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('19')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                        <li>
                            <h1>西北</h1>
                            <ul className="region-ul cl">
                                <li onClick = {(e) => this.click('26')} className={this.state.curr == 26?"curr":""}>陕西
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('26')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('28')} className={this.state.curr == 28?"curr":""}>甘肃
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('28')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('29')} className={this.state.curr == 29?"curr":""}>青海
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('29')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('31')} className={this.state.curr == 31?"curr":""}>宁夏
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('31')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                                <li onClick = {(e) => this.click('30')} className={this.state.curr == 30?"curr":""}>新疆
                                    <ul className="region-ul-third cl">
                                        {
                                            this.state.city!=null?
                                                this.cityList('30')
                                            :null
                                        }
                                    </ul>
                                </li>
                                
                            </ul>
                        </li>
                    </ul>
                    <Footer />
                </div>
            </div>
        )
    }
    componentDidMount() {
        util.getRequest('/city').then(
            data => {
                data.json().then(
                    json => {
                        this.setState({
                            city: json.city
                        })
                    }
                )
            }
        );
    }

    componentWillReceiveProps(nextProps) {

    }
    click(name){
        this.setState({
            curr:name
        })
    }
    cityList(num){
        let { city } = this.state;
        let cityList = [];
        city[num-1].city.map((obj) =>{
            cityList.push(<li><a href={"/sa/"+obj.value}>{obj.name}招标</a></li>)
        });
        return cityList;
    }
}
function select(state) {
    return {

    }
}
let IndexRegion = connect(select)(component);

render(
    <Provider store={store}>
        <IndexRegion />
    </Provider>
    ,
    document.getElementById("indexRegion")
);