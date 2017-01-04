/**
 * Created by wangxiaobo on 16/11/22.
 */
require('./Header.scss');
const util = require('../../app/util.js');
const render = require('react-dom').render;
const React = require('react');
let PropTypes = React.PropTypes;

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            hide:true,
            msession:null,
            level:null
        }
    }
    render() {
        let {hide,level} = this.state;
        return(
            <div className="module-Header">
                {
                    <div className="top-search">
                        {
                            hide == true ?
                                <h1>
                                    <a href="/index">
                                        <img className="logo" src="../img/logo.png" alt="采购与招标网"/>
                                    </a>
                                </h1>
                                :null
                        }
                    <span className={"search-container"+(hide == true?"":" search-containers")}>
                        <a className="serch-btn" href="javascript:;"><img src="../img/search.png"/></a>
                        <a href="/search"><input className="search-input" type="text" placeholder="请输入你要搜索的内容" onClick ={(e) => this.click('search')}/></a>
                    </span>
                        {
                            hide == true ?
                                <a className={this.state.msession!=null?level==0? "mine":"login":"login"} href={this.state.msession!=null?level==0? "/mine":"/login":"/login"}>
                                    {
                                        this.state.msession!=null?
                                            level=="0"? "我的"
                                                :"登录/注册"
                                            :"登录/注册"
                                    }
                                </a>
                                :<a className="cancel" onClick ={(e) => this.click('cancel')}>取消</a>
                        }
                    </div>
                }
            </div>
        )
    }
    componentDidMount() {
        let msession = sessionStorage.getItem("msession");
        if(msession!=null){
            let info = {msession:msession};
            util.postRequest('/level',info).then(
                data => {
                    data.json().then(
                        json => {
                            this.setState({
                                level:json.login
                            })
                        }
                    )
                }
            )
        }
            this.setState({
                msession:msession
            })
    }
    click(name){
        switch (name){
            case 'search':
                /*
                let inputClick = this.props.inputClick;
                if(typeof inputClick === "function"){
                    let hide = false;
                    inputClick(hide);
                    this.setState({
                        hide:hide
                    });
                }
                */
                break;
            case 'cancel':
                /*
                let inputClick = this.props.inputClick;
                if(typeof inputClick === "function"){
                    let hide = true;
                    inputClick(hide);
                    this.setState({
                        hide:hide
                    });
                }
                */
                break;
        }
    }
}

Header.propTypes = {
    //inputClick: PropTypes.func.isRequired //函数数据类型
};