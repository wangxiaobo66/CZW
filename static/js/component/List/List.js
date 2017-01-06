/**
 * Created by wangxiaobo on 16/12/21.
 */
require('./List.scss');
const util = require('../../app/util.js');

const region = {};


const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            province: null,
            category: null
        }
    }

    render() {
        let obj = this.props.obj, index = this.props.index;
        return (

            <li className="dynamic-list" key={obj.inDate} >
                <p className="dynamic-list-title" onClick={(e) => this.click(obj)}>{obj.title}</p>
                <p>
                        <span className="dynamic-list-addr"><a title={(this.state.province != null ? this.state.province[obj.areaId - 1].name : null)+"招标网"} href={"/sa/"+(this.state.province != null ? this.state.province[obj.areaId - 1].value:null)}>{this.state.province != null ? this.state.province[obj.areaId - 1].name : null}</a></span>
                    {
                        obj.categoryId.map((obj) => {
                            return (
                                <span className="dynamic-list-type">{this.state.category != null ? this.state.category[obj - 1].name : null}</span>
                            )
                        })
                    }
                        <span className="dynamic-list-time">{util.getLocalTime(obj.publishDate * 1000)}</span>
                </p>
            </li>
        )
    }

    componentDidMount() {
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
        util.getRequest('/category').then(
            data => {
                data.json().then(
                    json => {
                        this.setState({
                            category: json.category
                        })
                    }
                )
            }
        )

    }
    click(obj){
        let tableName3 = obj.tableName3,htmlid = obj.htmlid,id = obj.id;
        sessionStorage.setItem("id", id);
        let type = this.type(tableName3[0]);
        window.location.href = '/'+type+'/'+htmlid;
    }
    type(num){
        let type;
        switch (num){
            case 1:
                type = 'zbxx';
                break;
            case 2:
                type = 'zbxx';
                break;
            case 3:
                type = 'zbxx';
                break;
            case 4:
                type = 'zbxx';
                break;
            case 5:
                type = 'zbxx';
                break;
            case 6:
                type = 'cgxx';
                break;
            case 7:
                type = 'cgxx';
                break;
            case 8:
                type = 'xmxx';
                break;
        }
        return type;
    }
}