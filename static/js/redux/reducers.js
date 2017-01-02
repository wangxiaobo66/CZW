import { combineReducers } from 'redux'

function index(state={},action){
    switch (action.type){
        default:
            return state;
    }
}
function login(state={},action){
    switch (action.type){
        default:
            return state;
    }
}

export const CZW = combineReducers({
    index,//首页
    login//登录
});