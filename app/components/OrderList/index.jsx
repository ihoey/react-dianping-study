import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Item from './Item';

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const data = this.props.data;
        return (
            <div>
                {
                    data.map((e, i) => {
                        return <Item key={i} data={e} />;
                    })
                }
            </div>
        );
    }
}

module.exports = OrderList;