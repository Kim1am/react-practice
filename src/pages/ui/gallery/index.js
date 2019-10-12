import React, {Component} from 'react';
import {Card, Row, Col, Modal} from 'antd'
import './index.less'

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgs: [],
      imgReactDom: null,
      visible: false,
      currentImg: '',

    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    const imgs = this.generateImgs()
    this.setState({
      imgs: imgs
    }, () => {
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
  openGallery = (imgItem) => {
    this.setState({
      currentImg: imgItem,
      visible: true
    })
  }
  generateImgsReactDom = () => {
    const {imgs} = this.state
    const imgReactDom = imgs.map((list, rowIndex, arr) => {
      return (
        <Col key={rowIndex} md={(rowIndex === arr.length - 1) ? 4 : 5}>
          {list.map((imgItem, colIndex, colArr) => {
            return (
              <Card key={colIndex} cover={<img src={'/gallery/' + imgItem} alt={imgItem}
                                               onClick={this.openGallery.bind(this, imgItem)}/>}>
                <Card.Meta title="React" description="Learn React"/>
              </Card>
            )
          })}
        </Col>
      )
    })
    this.setState({
      imgReactDom: imgReactDom
    })
  }

  closeGallery = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-between">
          {this.state.imgReactDom}
        </Row>
        <Modal
          visible={this.state.visible}
          onCancel={this.closeGallery}
          footer={null}
          title="图片画廊"
        >
          <img src={`/gallery/${this.state.currentImg}`} alt={this.state.currentImg} style={{width: '100%'}}/>
        </Modal>
      </div>
    );
  }
}

export default Gallery;
