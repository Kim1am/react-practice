import React, {Component} from 'react'
import {Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../utils/utils'

const FormItem = Form.Item

class BaseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }

  handleOnClick = () => {
    let fieldsValue =  this.props.form.getFieldsValue()
    this.props.filtersSubmit(fieldsValue)
  }
  reset = ()=>{
    this.props.form.resetFields()
  }
  initFormList = () => {
    const {getFieldDecorator} = this.props.form
    const formList = this.props.formList
    const formItemList = []
    if (formList && formList.length > 0) {
      formList.forEach((item, index) => {
        let label = item.label
        let field = item.field
        let initValue = item.initialValue || ''
        let placeholder = item.placeholder
        let width = item.width
        if(item.type === '时间查询'){
          const startTime = (
            <FormItem label="订单时间" key="startTime">
              {
                getFieldDecorator('startTime')(
                  <DatePicker placeholder="开始时间" showTime={true} format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
          )
          formItemList.push(startTime)
          const endTime = (
            <FormItem label="~" colon={false} key="endTime">
              {
                getFieldDecorator('endTime')(
                  <DatePicker placeholder="结束时间" showTime={true} format="YYYY-MM-DD HH:mm:ss"/>
                )
              }
            </FormItem>
          )
          formItemList.push(endTime)
        }else if (item.type === 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator(`${field}`, {
                  initialValue: initValue,
                })(
                  <Input type="text"  style={{width: width}} placeholder={placeholder}></Input>
                )
              }
            </FormItem>
          )
          formItemList.push(INPUT)
        } else if (item.type === 'SELECT') {
          const SELECT = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator(`${field}`, {
                  initialValue: initValue,
                })(
                  <Select placeholder={placeholder} style={{width: width}}>
                    {Utils.getOptionList(item.list)}
                  </Select>
                )
              }
            </FormItem>
          )

          formItemList.push(SELECT)
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {
                getFieldDecorator(`${field}`, {
                  valuePropName: 'checked',
                  initialValue: initValue,  //true/false
                })(
                  <Checkbox>
                    {label}
                  </Checkbox>
                )
              }
            </FormItem>
          )

          formItemList.push(CHECKBOX)
        }
      })
    }
    return formItemList
  }

  render() {
    return (
      <Form layout="inline">
        {this.initFormList()}
        <FormItem>
          <Button type="primary" style={{marigin: '0 20px'}} onClick={this.handleOnClick}>查询</Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create({})(BaseForm)

