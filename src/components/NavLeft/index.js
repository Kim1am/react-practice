import React, {Component} from 'react';
import MenuCofig from '../../config/menuConfig'
import {Menu} from 'antd';
import {NavLink} from 'react-router-dom'
import "./index.less"
import {connect} from 'react-redux'
import {switchMenu} from "../../redux/action";

const {SubMenu} = Menu

class NavLeft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: null,
      currentKey:[]
    }
  }

  componentDidMount() {
    const menuTreeNode = this.renderMenu(MenuCofig)
    let currentKey = window.location.hash.replace(/#|\?.*$/g,'')
    this.setState({
      currentKey:[currentKey],
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
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={`${item.key}`}>
            {item.title}
          </NavLink>
        </Menu.Item>
      )
    })
  }
  handleClick = ({ item, key }) => {
    const  {dispatch} = this.props
    dispatch(switchMenu(item.props.title))
    this.setState({
      currentKey:[key]
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu onClick={this.handleClick} theme="dark" selectedKeys={this.state.currentKey}>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default connect()(NavLeft);
