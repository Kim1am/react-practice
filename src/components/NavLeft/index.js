import React, {Component} from 'react';
import MenuCofig from '../../config/menuConfig'
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom'
import "./index.less"

const {SubMenu} = Menu

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: null
    }
  }

  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuCofig)
    this.setState({
      menuTreeNode: menuTreeNode
    })
  }

  //菜单渲染
  renderMenu = (data) => {
    return data.map((item)=>{
      if(item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key}>
          <NavLink to={`/admin${item.key}`}>
            {item.title}
          </NavLink>

        </Menu.Item>
      )
    })
  }
  handleClick = () => {

  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu theme="dark">
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default NavLeft;
