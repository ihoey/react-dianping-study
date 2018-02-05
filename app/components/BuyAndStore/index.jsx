import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }


    render() {
        console.log(this.props);        
        return (
            <div>12</div>
        );
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default BuyAndStore
module.exports = BuyAndStore;