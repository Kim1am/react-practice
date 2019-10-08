import React, {Component} from 'react';
import {Row, Col} from 'antd'
import "./index.less"
import Util from '../../utils/utils'

import axios from '../../axios/index'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '欢迎XXXXXXX',
      sysTime: '',
      dayPictureUrl:'',
      weather:''
    }
  }
  componentDidMount() {
    this.getWeatherAPIData()
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({
        sysTime: sysTime
      })
    }, 1000)
  }

  getWeatherAPIData() {
    let city = '广州'
    axios.jsonp({
      url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    }).then((res) => {
      let data = res.results[0].weather_data[0]
      this.setState({
        dayPictureUrl:data.dayPictureUrl,
        weather:data.weather
      })
    })
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">首页</Col>
          <Col span={20} className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-img">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">
              {this.state.weather}
            </span>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
