import React from 'react'
import {Tabs, Card, Select, Row, Col} from 'antd'

const Option = Select.Option
const TabPane = Tabs.TabPane

class Dishtag extends React.Component {
  render() {
    return (
      <Tabs>
        <TabPane tab="菜单选取" />
        <TabPane tab="详细列表" />
      </Tabs>
    )
  }
}
export default Dishtag
