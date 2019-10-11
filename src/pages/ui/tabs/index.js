import React, {Component} from 'react';
import {Tabs, message, Card, Icon} from 'antd'
import './index.less'

const {TabPane} = Tabs

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          title: 'tab1',
          contetn: 'tab 1',
          key: '1'
        },
        {
          title: 'tab2',
          contetn: 'tab 2',
          key: '2'
        },
        {
          title: 'tab3',
          contetn: 'tab 3',
          key: '3'
        },
      ],
      newIndex: 0,
      activeKey: 0
    }
  }

  componentDidMount() {
    const {panes} = this.state;
    this.setState({
      activeKey: panes[0].key
    })
  }

  callback = (key) => {
    message.info(key)
  }
  editTabs = (targetKey, action) => {
    this[action](targetKey);
  }
  add = () => {
    const {panes} = this.state;
    const activeKey = `newTab${this.state.newIndex++}`;
    panes.push({title: 'New Tab', content: 'Content of new Tab', key: activeKey});
    this.setState({panes, activeKey});
  }
  remove = (targetKey) => {
    let {activeKey} = this.state;
    //用于记录下个激活tab的index
    let lastIndex;
    this.state.panes.forEach((pane, index) => {
      if (pane.key === targetKey) {
        lastIndex = index - 1
      }
    })
    const panes = this.state.panes.filter((pane) => {
      return pane.key !== targetKey
    })
    if(panes.length && activeKey === targetKey) {
      if(lastIndex >= 0) {
        activeKey = panes[lastIndex].key
      }else {
        activeKey = panes[0].key
      }
    }
    console.log(panes)
    this.setState({
      panes:panes,
      activeKey
    })
  }

  render() {
    return (
      <div>
        <Card title="Tabs标签页" bordered={false}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>,
        </Card>
        <Card title="Tabs图标标签页" bordered={false}>
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type='plus'></Icon>标签一</span>} key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tabs动态标签页" bordered={false}>
          <Tabs defaultActiveKey={this.activeKey} onChange={this.callback} type="editable-card"
                onEdit={this.editTabs.bind(this)}>
            {
              this.state.panes.map((panel) => {
                return <TabPane tab={panel.title} key={panel.key}></TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}

export default Tab;
