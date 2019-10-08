import React, {Component} from 'react';
import {Card, Button, Radio} from 'antd'
import './index.less'

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      default: 'default'
    }
  }

  turnLoading = () => {
    this.setState({
      loading: false
    })
  }
  changeSize = (e) => {
    this.setState({
      default: e.target.value
    })
  }

  render() {
    return (
      <div>
        <Card title="基础按钮" bordered={false}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button type="link">Link</Button>
        </Card>
        <Card title="图形按钮" bordered={false}>
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="search" shape="circle"></Button>
          <Button icon="search" type="primary">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>
        <Card title="加载按钮" bordered={false}>
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" shape="cirle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="cirle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.turnLoading}>关闭</Button>
        </Card>
        <Card title="按钮组" bordered={false}>
          <ButtonGroup>
            <Button type="primary" icon="left">返回</Button>
            <Button type="primary" icon="right">前进</Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" bordered={false}>
          <RadioGroup value={this.state.size} onChange={this.changeSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.default}>Primary</Button>
        </Card>
      </div>
    );
  }
}

export default Buttons;
