import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import BuyAndStore from '../../../components/BuyAndStore';
import * as storeActionsFromFile from '../../../actions/store';

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore: false
        };
    }

    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} />
        );
    }

    componentDidMount() {
        this.checkStoreState();
    }

    // 检验当前商户是否已经被收藏
    checkStoreState() {
        const id = this.props.id;
        const store = this.props.store;

        store.some(item => {
            if (item.id == id) {
                this.setState({
                    isStore: true
                });
                return true;
            }
        });
    }

    // 购买事件
    buyHandle() {
        const loginFlag = this.loginCheck();
        if (!loginFlag) {
            return;
        }
        hashHistory.push('/User/');
    }

    // 收藏时间
    storeHandle() {
        const loginFlag = this.loginCheck();
        if (!loginFlag) {
            return;
        }

    }

    // 验证登录
    loginCheck() {
        const id = this.props.id;
        const userinfo = this.props.userinfo;
        if (userinfo.username) {
            // 跳转到登陆页
            hashHistory.push(`/Login/${encodeURIComponent(`/detail/${id}`)}`);
            return false;
        }
        return true;
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store: state.store
    };
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy);