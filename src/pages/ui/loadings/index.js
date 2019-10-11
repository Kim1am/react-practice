import React, {Component} from 'react';
import {Spin, Card,Icon,Alert} from 'antd'
import './index.less'

class Loadings extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    const icon = <Icon type="loading" style={{fontSzie:24}}/>
    return (
      <div>
        <Card title="Spin用法" bordered={false}>
          <Spin size='small' />
          <Spin style={{margin:'0 20px'}} />
          <Spin size='large' />
          <Spin indicator={icon} style={{marginLeft:10}}/>
        </Card>
        <Card title="内容遮罩" bordered={false}>
          <Alert
          message="React"
          description="REACT practice"
          type="error"
          style={{marginBottom:10}}
          />
          <Spin tip='加载中...' indicator={icon}>
            <Alert
              message="React"
              description="REACT practice"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}

export default Loadings;
