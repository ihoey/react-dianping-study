import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getListData } from '../../../fetch/home/home';
import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';

import './style.less';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data: [], //存储列表信息
            hasMore: false, //是否有更多
            isLoadingMore: false, //当前状态
            page: 1 //下一页页码
        };
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length ? <ListComponent data={this.state.data} /> : <div>加载中...</div>
                }
                {
                    this.state.hasMore ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} /> : <div></div>
                }
            </div>
        );
    }
    componentDidMount() {
        //获取首页数据
        this.loadFirstPageData();
    }
    //获取首屏数据
    loadFirstPageData() {
        const cityName = this.props.cityName;
        const result = getListData(cityName, 0);
        this.resultHandle(result);
    }
    loadMoreData() {
        this.setState({
            isLoadingMore: true
        });

        const cityName = this.props.cityName;        
        const page = this.state.page;
        const result = getListData(cityName, page);
        this.resultHandle(result);
        
        //增加 page 的计数
        this.setState({
            page: page + 1,
            isLoadingMore: false
        });
    }
    //数据处理
    resultHandle(result) {
        result.then((res) => {
            return res.json();
        }).then((json) => {
            if (json.length !== 0) {
                const hasMore = json.hasMore;
                const data = json.data;
                this.setState({
                    hasMore: hasMore,
                    data: [...this.state.data, ...data]
                });
            }
        });
    }
}
export default List;