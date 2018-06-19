import React from 'react'
import Order from '../Order/index.jsx'
import {Tabs, Card, Select, Row, Col} from 'antd'

const Option = Select.Option
const TabPane = Tabs.TabPane
class DataTag extends React.Component {
  componentDidMount() {
    console.log(this.props)
  }
  handleChange = value => {
    this.props.cli(value)
    console.log(`selected ${value}`)
  }

  render() {
    const bui = []
    var rows = []
    if (this.props.state.isLoaded) {
      Object.keys(this.props.state.summary.order.dish).map((item, i) =>
        bui.push(
          <Col style={{height: '100%'}} key={i} span={12}>
            <Card style={{minHeight: '220px', margin: '5px', height: '100%'}}>
              <div style={{height: '100%', float: 'left', width: '100%'}}>
                <div style={{height: '100%'}}>
                  <p style={{margin: '0px'}}>{item}</p>
                  <p style={{margin: '0px'}}>
                    {'共:' + this.props.state.summary.order.dish[item].total}
                  </p>
                  <hr />
                </div>
                {Object.keys(
                  this.props.state.summary.order.dish[item]['类别']
                ).map((items, i) => (
                  <div key={i}>
                    {items +
                      ':\t\t' +
                      this.props.state.summary.order.dish[item]['份数'][
                        items + '份数'
                      ]}
                    {Object.keys(
                      this.props.state.summary.order.dish[item]['类别'][items]
                    ).map((itemss, i) => (
                      <div key={i}>
                        {itemss !== '无配菜'
                          ? '--' +
                            itemss +
                            ':' +
                            this.props.state.summary.order.dish[item]['类别'][
                              items
                            ][itemss]
                          : ''}
                      </div>
                    ))}
                    <br />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        )
      )
      var x = Math.ceil(bui.length / 2)
      console.log(x)
      for (var i = 0; i < bui.length; i++) {
        if ((i + 2) % 2 === 0) {
          rows.push(
            <Row
              style={{padding: '2%', margin: '2px', height: '100%'}}
              key={i}
              justify="space-between"
            >
              {bui.slice(i, i + 2)}
            </Row>
          )
        }
      }
      return (
        <div>
          <div>
            <Select
              defaultValue={this.props.state.selectid}
              style={{width: 120}}
              onChange={this.handleChange}
            >
              {this.props.state.orderlist.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.date}
                </Option>
              ))}
            </Select>
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="汇总" key="1" style={{height: '100%'}}>
              <Row type="flex" justify="space-around" style={{height: '100%'}}>
                <Col span={2} />
                <Col span={6}>
                  <div>
                    <p style={{margin: '0px'}}>
                      总计:{this.props.state.summary.order.total}份
                    </p>
                    <hr />
                    {Object.keys(this.props.state.summary.order.type).map(
                      (item, i) => (
                        <p key={i} style={{fontSize: '60%', height: '100%'}}>
                          &nbsp;&nbsp;&nbsp;{item +
                            ' :' +
                            this.props.state.summary.order.type[item] +
                            '份'}
                        </p>
                      )
                    )}
                  </div>
                </Col>

                <Col span={6}>
                  <div>
                    <div>
                      <p style={{margin: '0px'}}>配菜:</p>
                    </div>
                    <hr />
                    {this.props.state.summary.starter.map((item, i) => (
                      <p key={i} style={{fontSize: '60%', height: '100%'}}>
                        &nbsp;&nbsp;&nbsp;{item.title +
                          ': ' +
                          item.num +
                          '份\t'}
                      </p>
                    ))}
                  </div>
                </Col>
                <Col span={2} />
              </Row>
              <div style={{background: '#F5F5F5', height: '100%'}}>{rows}</div>
            </TabPane>
            <TabPane tab="详细列表" key="2">
              <Order msg={this.props.state} ss={this.props.tablef} />
            </TabPane>
          </Tabs>
        </div>
      )
    } else {
      return <div>loading..</div>
    }
  }
}
export default DataTag
