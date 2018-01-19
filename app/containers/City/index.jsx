import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from '../../components/Header';
import CityList from '../../components/CityList';
import CurrentCity from '../../components/CurrentCity';

import * as userInfoActionsFromOtherFile from '../../actions/userinfo';

import LocalStore from '../../util/localStore';
import { CITYNAME } from '../../config/localStoreKey';

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div>
                <Header title="选择城市" />
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)} />
            </div>
        );
    }
    changeCity(newCity) {
        if (newCity == null) {
            return;
        }
        // 修改 redux
        const userinfo = this.props.userinfo;
        userinfo.cityName = newCity;
        this.props.userInfoActions.update(userinfo);

        // 修改 cookie
        LocalStore.setItem(CITYNAME, newCity);

        // 跳转页面
        hashHistory.push('/');
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    };
}


// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City);