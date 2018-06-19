import { Modal, Button, Form, Input, Select } from 'antd';
import React from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

class Editbtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isdone: false,
            loading: false,
            visible: false,
            data: this.props.changedata,
            dtlist: this.props.dtype
        }
        console.log(this.props);
    }
    componentDidMount() {
        if (this.props.changedata !== undefined)
            this.setState({
                data: this.props.changedata,
                dtlist: this.props.dtype,
                isdone: true
            })
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    render() {
        const { visible, loading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    {this.props.children}
                </Button>
                <Modal
                    visible={visible}
                    title="Edit"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>Submit</Button>,
                    ]}
                >
                    <h1>{this.state.data.title}</h1>
                    <Form layout="vertical">
                        <FormItem label='类别:'>
                            <Select defaultValue={this.state.data.dtid}>{this.state.dtlist.map((value, key) => {
                                return <Option key={value.dtid} value={value.dtid}>{value.dtname}</Option>
                            })}</Select>
                        </FormItem>
                        <FormItem label="价格:">
                            <Input defaultValue={this.state.data.price} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Editbtn;
