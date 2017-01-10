/**
 * Created by wangxiaobo on 16/12/5.
 */
const util = require('../../app/util.js');
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        return(
            <div className="module-Header">
                <footer className="footer-nav">
                    <nav>
                        <span><a href={(util.http())+"/navigater"}>网站导航</a></span><span><a href="tel:400-006-6655">客服中心</a></span><span><a href="https://www.chinabidding.cn/">电脑版</a></span><span><a href={(util.http())+"/"}>返回首页</a></span>
                    </nav>
                    <div className="copyright">copyright@采购与招标网</div>
                </footer>
            </div>
        )
    }
}

Footer.propTypes = {

};