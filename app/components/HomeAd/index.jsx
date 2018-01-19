import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './style.less';

class HomeAd extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div id="home-ad">
                <h2>超级特惠</h2>
                <div className="ad-container clear-fix">
                    {this.props.data.map((e, i) => {
                        return <div key={i} className="ad-item float-left">
                            <a href={e.link} target="_blank"><img src={e.img} alt="" /></a>
                        </div>;
                    })}
                </div>
            </div>
        );
    }
}

export default HomeAd;