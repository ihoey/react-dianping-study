import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            cityList: ['北京', '上海', '杭州', '广州', '苏州', '深圳', '南京', '天津', '重庆', '厦门', '武汉', '西安']
        };
    }
    render() {
        var cityList = this.state.cityList;
        return (
            <div className="city-list-container">
                <h3>热门城市</h3>
                <ul className="clear-fix">
                    {cityList.map((e, i) => {
                        return <li key={i}>
                            <span onClick={()=>this.clickHandle(e)}>{e}</span>
                        </li>;
                    })}
                </ul>
            </div>
        );
    }
    clickHandle(cityName) {
        const changeFn = this.props.changeFn;
        changeFn(cityName);
    }
}

export default CityList;