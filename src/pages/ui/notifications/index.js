import React, {Component} from 'react';
import {notification, Card, Button} from 'antd'
import './index.less'

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  showNotification = (type, place = 'bottomRight') => {
    console.log(place)
    notification[type]({
      message: type,
      description: "调用" + type,
      placement: place
    })
  }

  render() {
    return (
      <div>
        <Card title="通知提醒框" bordered={false}>
          <Button type="primary" onClick={()=>this.showNotification('success')}>Success</Button>

          <Button type="primary" onClick={()=>this.showNotification('info')}>Info</Button>

          <Button type="primary" onClick={()=>this.showNotification('warning')}>Warning</Button>

          <Button type="primary" onClick={()=>this.showNotification('error')}>Error</Button>

        </Card>
        <Card title="通知提醒框" bordered={false}>
          <Button type="primary" onClick={()=>this.showNotification('success', 'topLeft')}>Success</Button>

          <Button type="primary" onClick={()=>this.showNotification('info', 'topRight')}>Info</Button>

          <Button type="primary" onClick={()=>this.showNotification('warning', 'bottomLeft')}>Warning</Button>

          <Button type="primary" onClick={()=>this.showNotification('error', 'bottomRight')}>Error</Button>

        </Card>
      </div>
    );
  }
}

export default Notifications;
