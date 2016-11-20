/**
 * Created by wangxiaobo on 16/11/18.
 */
require('./index.scss');
const util = require('../../app/util.js');
const React = require('react');
const render = require('react-dom').render;

const { Provider, connect } = require('react-redux');
const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const { CZW } = require('../../redux/reducers');

let store = createStore(CZW, applyMiddleware(thunk));

let {} = require('./actions.js');//从actions中拿到方法

class component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let {index} = this.props;
        console.log(index);
        return (
            <div className="module-index">
                <p>这是首页</p>
            </div>
        )
    }
    componentDidMount() {

    }
    componentWillReceiveProps(nextProps) {

    }
}
function select(state) {
    return {
        index: state.index
    }
}
let Index = connect(select)(component);

render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById("index")
);