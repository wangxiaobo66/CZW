/**
 * Created by wangxiaobo on 16/12/26.
 */
require('./SearchHeader.scss');
const util = require('../../app/util.js');
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="module-SearchHeader">
                <div className="top-search">
                    <span className="search-container">
                        <a className="serch-btn" href=""><img src="./image/search.png"/></a>
                        <input className="search-input" type="text" name="" placeholder="请输入与你要搜索的内容"/>
                    </span>
                    <a className="cancel" href="">取消</a>
                </div>
            </div>
        )
    }
}

    SearchHeader.propTypes = {

    };