import React, {Component} from 'react';
import {Modal, Card, Button} from 'antd'
import './index.less'

class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      open2: false,
      open3: false,
      open4: false,
    }
  }

  shohModal = (type) => {
    this.setState({
      [type]: true
    })
  }
  closeModal = (type) => {
    this.setState({
      [type]: false
    })
  }
  handleConfirm = (type) => {
    Modal[type]({
      title: '确认',
      content: type,
      onOk() {
        console.log("OK")
      },
      onCancel() {
        console.log('Close')
      }
    })
  }

  render() {
    return (
      <div>
        <Card title="基础模态框" bordered={false}>
          <Button type="primary" onClick={this.shohModal.bind(this, 'open')}>Open</Button>
          <Button type="primary" onClick={this.shohModal.bind(this, 'open2')}>自定义底部</Button>
          <Button type="primary" onClick={this.shohModal.bind(this, 'open3')}>顶部20px弹框</Button>
          <Button type="primary" onClick={this.shohModal.bind(this, 'open4')}>水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" bordered={false}>
          <Button type="primary" onClick={this.handleConfirm.bind(this, 'confirm')}>confirm</Button>
          <Button type="primary" onClick={this.handleConfirm.bind(this, 'info')}>Info</Button>
          <Button type="primary" onClick={this.handleConfirm.bind(this, 'success')}>success</Button>
          <Button type="primary" onClick={this.handleConfirm.bind(this, 'warning')}>warning</Button>
        </Card>
        <Modal title="React" visible={this.state.open} onCancel={this.closeModal.bind(this, 'open')}>
          <p>Open</p>
        </Modal>
        <Modal title="React" visible={this.state.open2}
               footer={[
                 <Button key="back" onClick={this.closeModal.bind(this, 'open2')}>
                   取消
                 </Button>,
                 <Button key="submit" type="primary" onClick={this.closeModal.bind(this, 'open2')}>
                   确认
                 </Button>,
               ]}
               onCancel={this.closeModal.bind(this, 'open2')}>
          <p>Some contents...</p>
        </Modal>
        <Modal style={{top: 20}} title="React" visible={this.state.open3}
               onCancel={this.closeModal.bind(this, 'open3')}>
          <p>Some contents...</p>
        </Modal>
        <Modal centered title="React" visible={this.state.open4} onCancel={this.closeModal.bind(this, 'open4')}>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Modals;
