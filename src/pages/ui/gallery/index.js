import React, {Component} from 'react';
import {Card, Row, Col} from 'antd'
import './index.less'

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      imgReactDom: null
    }
  }
  componentWillMount() {

  }

  componentDidMount() {
    const imgs = this.generateImgs()
    this.setState({
      imgs:imgs
    },()=>{
      this.generateImgsReactDom()
    })
  }

  generateImgs = () => {
    const row = 5
    const col = 5
    let imgs = []
    for (let i = 1; i <= row; i++) {
      imgs[i - 1] = []
      for (let j = 1; j <= col; j++) {
        imgs[i - 1][j - 1] = ((i - 1) * 5 + j) + '.png'
      }
    }
    return imgs
  }
  generateImgsReactDom = () => {
    const {imgs} = this.state
    const imgReactDom =  imgs.map((list, rowIndex) => {
      return (
        <Row key={rowIndex} type="flex" justify="space-between">
          {list.map((imgItem, colIndex, colArr) => {
            return (
              <Col key={colIndex} span={Math.floor(24 / colArr.length)}>
                <Card cover={<img src={'/gallery/' + imgItem} alt={imgItem}/>}>
                  <Card.Meta title="React" description="Learn React"/>
                </Card>
              </Col>
            )
          })}
        </Row>
      )
    })
    this.setState({
      imgReactDom:imgReactDom
    })
  }

  render() {
    return (
      <div>
        {this.state.imgReactDom}
      </div>
    );
  }
}

export default Gallery;
