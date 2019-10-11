import React, {Component} from 'react';
import {message, Card, Button} from 'antd'
import './index.less'

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  showMessage = (type) => {
    message[type]('REACT,'+type)
  }

  render() {
    return (
      <div>
        <Card title="全局提示框" bordered={false}>
          <Button type="primary" onClick={this.showMessage.bind(this,'success')}>Success</Button>
          <Button type="primary" onClick={this.showMessage.bind(this,'error')}>error</Button>
          <Button type="primary" onClick={this.showMessage.bind(this,'info')}>Info</Button>
          <Button type="primary" onClick={this.showMessage.bind(this,'warning')}>warning</Button>
          <Button type="primary" onClick={this.showMessage.bind(this,'loading')}>loading</Button>
        </Card>
      </div>
    );
  }
}

export default Messages;
