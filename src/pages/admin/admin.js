import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import NavLeft from '../../components/NavLeft'
import '../../style/common.less'
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      <Row className="container">
        <Col className='nav-left' span={3}>
          <NavLeft></NavLeft>
        </Col>
        <Col span={21} className='main'>
          <Header></Header>
          <Row className='content'>
            <div className="home-wrap">
              {this.props.children}
            </div>
          </Row>
          <Footer></Footer>
        </Col>
      </Row>
    );
  }
}

export default Admin;
