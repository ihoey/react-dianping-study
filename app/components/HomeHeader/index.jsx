import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        return (
            <div className="clearfix">
                <div className="pull-left">深圳
                <i className="icon-angle-down"></i>
                </div>
                <div className="pull-right"><i className="icon-user"></i></div>
                <div><i className="icon-search"></i><input type="text" /></div>
            </div>
        );
    }
}

export default HomeHeader;