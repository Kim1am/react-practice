import React, { Component,Fragment } from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header'
import '../../style/common.less'
class Common extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      <Fragment>
      <Row className="simple-page">
          <Header menuType='second'></Header>
      </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </Fragment>
    );
  }
}

export default Common;
