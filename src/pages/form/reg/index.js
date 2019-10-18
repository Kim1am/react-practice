import React, {Component} from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Icon,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber,
} from 'antd';
import moment from 'moment';
import './index.less'

const FormItem = Form.Item

class Reg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      default: 'default',
      userImg: null,
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg:imageUrl,
          loading: false,
        }),
      );
    }
  }
  handleSubmit = ()=>{
    let registerInfo = this.props.form.getFieldsValue()
    console.log(registerInfo)
  }
  render() {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }
    const offsetLayOut = {
      wrapperCol: {
        xs: 24,
        sm: {
          span:12,offset:4
        }
      }
    }
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            <FormItem label="用户名" {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(<Input placeholder="请输入用户名"/>)
              }
            </FormItem>
            <FormItem label="密码" {...formItemLayout}>
              {
                getFieldDecorator('password', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    }
                  ]
                })(<Input type="password" placeholder="请输入密码"/>)
              }
            </FormItem>
            <FormItem label="性别" {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1',
                  rules: []
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="2">女</Radio>
                  </Radio.Group>
                )
              }
            </FormItem>
            <FormItem label="年龄" {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18',
                  rules: []
                })(
                  <InputNumber/>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '2',
                  rules: []
                })(
                  <Select>
                    <Select.Option value="1">1</Select.Option>
                    <Select.Option value="2">2</Select.Option>
                    <Select.Option value="3">3</Select.Option>
                    <Select.Option value="4">4</Select.Option>
                    <Select.Option value="5">5</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="当前状态" {...formItemLayout}>
              {
                getFieldDecorator('interest', {
                  initialValue: ['1', '5'],
                  rules: []
                })(
                  <Select mode="multiple">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="是否空闲" {...formItemLayout}>
              {
                getFieldDecorator('isOutTime', {
                  valuePropName: 'checked',
                  initialValue: true,
                  rules: []
                })(
                  <Switch/>
                )
              }
            </FormItem>
            <FormItem label="生日" {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2019-10-13'),
                  rules: []
                })(
                  <DatePicker/>
                )
              }
            </FormItem>
            <FormItem label="联系地址" {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '12313312313'
                })(<Input.TextArea autosize={{minRows: 4, maxRows: 6}}/>)
              }
            </FormItem>
            <FormItem label="早起时间" {...formItemLayout}>
              {
                getFieldDecorator('wakeUp', {
                  initialValue: moment('12:08:23', 'HH:mm:ss'),
                })(<TimePicker/>)
              }
            </FormItem>
            <FormItem label="头像" {...formItemLayout}>
              {
                getFieldDecorator('avator')(
                  <Upload
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={this.handleChange}
                  >
                    {this.state.userImg ? <img src={this.state.userImg} alt="123"/> : <Icon type="plus"/>}
                  </Upload>
                )
              }
            </FormItem>
            <FormItem {...offsetLayOut}>
              {
                getFieldDecorator('contract', {
                })(<Checkbox>我已经阅读过<a href="#">慕课协议</a></Checkbox>)
              }
            </FormItem>
            <FormItem {...offsetLayOut}>
              {
                getFieldDecorator('sbumit', {
                })(<Button type="primary" onClick={this.handleSubmit}>注册</Button>)
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(Reg);
