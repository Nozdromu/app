import React from 'react';
import { Table, Button, Row, Col } from 'antd';
import Editbtn from '../Editbtn/index.jsx';
//const EditableContext = React.createContext();

class Dishtable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cdata: {
                typeclo: [],
                typedata: props.dt
            }
        };
    }
    componentDidMount() {
        var clo = [];
        if (this.props.data.length > 0) {
            Object.entries(this.props.data[0]).map((key, value) => {
                if (key[0] !== 'id' && key[0] !== 'English' && key[0] !== 'note'&& key[0] !== 'url') {
                    if (key[0] === 'isdeleted') {
                        clo.push({
                            'title': 'Action', 'dataIndex': key[0], 'key': key[0],
                            render: () => (
                                <span className="table-operation">
                                    <Button>编辑</Button>
                                </span>
                            ),
                            
                        });
                    }else if(key[0] === 'title'){
                        clo.push({ 'title': key[0], 'dataIndex': key[0], 'key': key[0],'fixed':'left' });
                    }
                    else {
                        clo.push({ 'title': key[0], 'dataIndex': key[0], 'key': key[0] });
                    }
                }
                return null;
            })
            var childtable = {
                typeclo: [],
                typedata: []
            }
            childtable.typedata = this.props.dt;
            Object.entries(this.props.dt[0]).map((key, value) => {
                if (key[0] !== 'did' && key[0] !== 'dtid')
                    if (key[0] === 'isdeleted') {
                        childtable.typeclo.push({
                            'title': key[0], 'dataIndex': key[0], sorter: true, 'key': key[0],
                            render: () => (
                                <span className="table-operation">
                                    <a href="javascript:;">Delete</a>
                                </span>
                            ),
                        });
                    }
                    else {
                        childtable.typeclo.push({ 'title': key[0], 'dataIndex': key[0], sorter: true, 'key': key[0] });
                    }
                    return null;
            })
            childtable.typeclo.push({
                'title': 'action', 'dataIndex': 'action', 'key': 'action',
                render: (text, record, index) => (
                    < Row >
                        <Col span={24}>
                            <Editbtn changedata={record} dtype={this.props.typelist}
                            >编辑</Editbtn>
                        </Col>
                    </Row>
                ),
            });

            this.setState({
                Column: clo,
                Data: this.props.data,
                cdata: childtable
            })
        }

    }

    render() {
        const childdata = (text) => {
            var showdata = this.state.cdata.typedata.filter(word => word.title === text.title);;
            return <div><Table
                rowKey='id'
                columns={this.state.cdata.typeclo}
                dataSource={showdata}
                pagination={false}
            /><div style={{width:'100%',align:"center"}}><Button style={{margin:'5px'}}>添加</Button></div></div>
        }
        return (
            <div><Button size={'large'} type={'primary'} style={{margin:'5px'}}>添加新菜品</Button>
            <Table
                rowKey='title'
                columns={this.state.Column}
                dataSource={this.state.Data}
                expandedRowRender={childdata}
                pagination={false}
            /></div>
        )
    }
}
export default Dishtable;