import React, {Component} from 'react'
import {Card, Button, Modal} from 'antd'
import {Editor} from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Rich extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: null,
      showRichText: false,
      editorContent: ''
    }
  }


  handleClearContent = () => {
    this.setState({
      editorState: ''
    })
  }

  handleGetText = () => {
    this.setState({
      showRichText: true
    })
  }

  onEditorChange = (editorContent) => {
    this.setState({
      editorContent,
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
          <Button type="primary" onClick={this.handleGetText}>获取HTML文本</Button>
        </Card>
        <Card title={"富文本编辑器"}>
          <Editor
            editorState={this.state.editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.showRichText}
          onCancel={() => {
            this.setState({
              showRichText: false
            })
          }}
          footer={null}
        >
          {draftjs(this.state.editorContent)}
        </Modal>
      </div>
    )
  }
}

export default Rich
