import React, {Component} from 'react'
import {Card, Button, Table, Form, Select} from 'antd'
import './../../mock/api'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './index.less'

const FormItem = Form.Item

class City extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/mode1/openCity',
      method: 'get'
    }).then((res) => {
      this.setState({
        list: res.dataSource.list.map((item, index) => {
          item.key = index
          return item
        }),
        pagination: Utils.pagination(res, (current) => {
          this.params.page = current
          this.requestList()
        })
      })
    }).catch((e) => {
      console.log(e)
    })
  }

  //开通城市
  handleOpenCity = () => {

  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'

      },
      {
        title: '城市名称',
        dataIndex: 'name'

      },
      {
        title: '用车模式',
        dataIndex: 'mode'
      },
      {
        title: '运营模式',
        dataIndex: 'opMode'
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchiseeName'
      },
      {
        title: '城市管理员',
        dataIndex: 'cityAdmins',
        render(arr) {
          return arr.map((item) => {
            return item.userName
          }).join(',')
        }
      },
      {
        title: '城市开通时间',
        dataIndex: 'openTime'
      },
      {
        title: '操作时间',
        dataIndex: 'updateTime'
      },
      {
        title: '操作人',
        dataIndex: 'sysUserName',
      },

    ]
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card>
          <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
        </Card>
        <div className="content-wrap">
          <Table columns={columns} dataSource={this.state.list} pagination={this.state.pagination}/>
        </div>
      </div>
    )
  }
}


export default City;


class FilterForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
    const {Option} = Select;
    return (
      <Form layout={"inline"}>
        <FormItem label="城市">
          {
            getFieldDecorator('cityId')(
              <Select placeholder="全部" style={{width: 100}}>
                <Option value="">前部</Option>
                <Option value="1">北京市</Option>
                <Option value="2">天津市</Option>
                <Option value="3">北京市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式">
          {
            getFieldDecorator('mode')(
              <Select placeholder="全部" style={{width: 150}}>
                <Option value="">全部</Option>
                <Option value="1">指定停车点模式</Option>
                <Option value="2">禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="运营模式">
          {
            getFieldDecorator('opMode')(
              <Select placeholder="全部" style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">自营</Option>
                <Option value="2">加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="加盟商授权状态">
          {
            getFieldDecorator('authStatus')(
              <Select placeholder="全部" style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">已授权</Option>
                <Option value="2">未授权</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem>
          <Button type="primary" style={{marigin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

FilterForm = Form.create({})(FilterForm)
