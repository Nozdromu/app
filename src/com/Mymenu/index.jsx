import React from 'react';
import { Menu, Icon } from 'antd';
import {Link } from "react-router-dom";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Mymenu extends React.Component {
  state = {
    current: 'mail',
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <SubMenu title={<span><Icon type="setting" />控制菜单</span>}>
          <MenuItemGroup title="菜单">
            <Menu.Item key="setting:1"><Link to="/orders">查看订单</Link></Menu.Item>
            <Menu.Item key="setting:2"><Link to="/about">编辑菜单</Link></Menu.Item>
            <Menu.Item key="setting:3"><Link to="/">用户控制</Link></Menu.Item>
            <Menu.Item key="setting:4">开单截单</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default Mymenu;