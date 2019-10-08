import React, { Component } from 'react';
class notFound extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render () {
    return (
      <div style={{textAlign:'center',fontSize:'24px'}}>
        没有找到该页面，请确认
      </div>
    );
  }
}

export default notFound;
