import React, {Component} from 'react';
import {Carousel , Card} from 'antd'
import './index.less'


class Carousels extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Card title="文字轮播">
          <Carousel  autoplay={true}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>
        <Card title="图片轮播" className="silder-wrap">
          <Carousel  autoplay={true} >
            <div>
              <img src="/carousel-img/carousel-1.jpg" alt="1.png"/>
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" alt="3.png"/>
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" alt="3.png"/>
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}

export default Carousels;

