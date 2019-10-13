import React, {Component} from 'react';
import {Card, Form, Input, Button, message, Icon, Checkbox} from 'antd'
import './index.less'

const FormItem = Form.Item

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      default: 'default'
    }
  }

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue()
    console.log(userInfo)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName}提交成功`)
      }
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <div>
        <Card title="登录行内表单" bordered={false}>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名"/>
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
              <Button type="primary">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" bordered={false}>
          <Form style={{width: '300px'}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 5, max: 10,
                      message: '长度不在范围内'
                    },
                    {
                      pattern: new RegExp('^\\w+$', 'g'),
                      message: '用户名必须为字母或数字'
                    }
                  ]
                })(<Input prefix={<Icon type="user"/>} placeholder="请输入用户名"/>)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('passWord', {
                  initialValue: '',
                  rules: []
                })(<Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>)
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName:'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)
              }
              <a href="#" style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(LoginForm);
