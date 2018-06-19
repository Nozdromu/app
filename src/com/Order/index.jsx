import React from 'react';
import { Table } from 'antd';

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            col:this.props.msg.orderclo,
            showorders:this.props.msg.showorders
        }
    }
    componentDidMount() {

    }
    handleTableChange = (pagination, filters, sorter) => {
        var t = [];
        if (filters.地点.length > 0) {
            filters.地点.map((key, value) => {
                t = t.concat(this.props.msg.orders.filter(word => word.地点 === key));
                return null;
            })
        } else {
            t = this.props.orders;
        }
        if (sorter != null) {

        }
        this.setState({
            showorders: t
        })
    }
    render() {
        return (<Table
            dataSource={this.state.showorders}
            columns={this.props.msg.orderclo}
            pagination={false}
            onChange={this.handleTableChange}
            loading={this.props.isLoaded}
            size="small" />)
    }
}
export default Order;