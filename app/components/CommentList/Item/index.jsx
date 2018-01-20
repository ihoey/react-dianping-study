import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Star from '../../Star';

import './style.less';

class CommentItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        // 获取数据
        const item = this.props.data;
        return (
            <div className="comment-item">
                <h3>
                    <i className="icon-user"></i>
                    &nbsp;
                    {item.user.nickname}
                </h3>
                <Star star={item.likedCount} />
                <p>{item.content}</p>
            </div>
        );
    }
}

export default CommentItem;