import React, {Component} from 'react'
import {Card, Button, Table, Form, Select, Modal, message, DatePicker} from 'antd'
import './../../mock/api'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import './index.less'


const FormItem = Form.Item
const {Option} = Select;

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      selectedRowKeys: [],
      selectItem: null,
      orderConfirmVisble: false,
      orderInfo: {}

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
      url: '/order/list',
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
  handleFinishOrder = () => {
    let item = this.state.selectItem;
    axios.ajax({
      url: '/order/finish',
      data: {
        params: {
          orderId: item.id
        }
      }
    }).then((res) => {
      if (res.code == 0) {
        message.success('订单结束成功')
        this.setState({
          orderConfirmVisble: false,
          selectedRowKeys: [],
          selectItem: null,
          orderInfo: {}
        })
        this.requestList();
      }
    })
  }
  handleConfirm = () => {
    let item = this.state.selectItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      })
      return;
    }
    axios.ajax({
      url: '/order/info',
      method: 'get'
    }).then((res) => {
      this.setState({
        orderInfo: res.result,
        orderConfirmVisble: true
      })
    }).catch((e) => {
      console.log(e)
    })
  }
  openOrderDetail = ()=>{
    let item = this.state.selectItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单'
      })
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`,'_blank')
  }
  onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectItem: this.state.list[selectedRowKeys[0]],
      selectedRowKeys
    });
  }

  onRowClick = (row, selectedRowKeys) => {
    this.setState({
      selectItem: row,
      selectedRowKeys: [selectedRowKeys]
    });
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'orderSn'

      },
      {
        title: '车辆编号',
        dataIndex: 'bikeSn'

      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '手机号码',
        dataIndex: 'mobile',
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'Km';
        }
      },
      {
        title: '时长',
        dataIndex: 'totalTime'
      },
      {
        title: '状态',
        dataIndex: 'status',
        render(value) {
          return value === 1 ? '进行中' : '已结束'
        }
      },
      {
        title: '开始时间',
        dataIndex: 'startTime'
      },
      {
        title: '结束时间',
        dataIndex: 'endTime',
      },
      {
        title: '订单金额',
        dataIndex: 'totalFee',
      }, {
        title: '实付金额',
        dataIndex: 'userPay',
      },

    ]
    const rowSelection = {
      type: "radio",
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectedRowKeysChange
    }
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    return (
      <div>
        <Card>
          <FilterForm/>
        </Card>
        <Card>
          <Button onClick={this.openOrderDetail}>订单详情</Button>
          <Button type="primary" style={{marginLeft: 10}} onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index)
                }, // 点击行
              };
            }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}/>
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bikeSn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.startTime}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}


export default Order

class FilterForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form
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
        <FormItem>
          {
            getFieldDecorator('startTime')(
              <DatePicker placeholder="开始时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        <FormItem>
          {
            getFieldDecorator('endTime')(
              <DatePicker placeholder="结束时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
            )
          }
        </FormItem>
        <FormItem label="订单状态">
          {
            getFieldDecorator('startTime')(
              <Select placeholder="全部" style={{width: 100}}>
                <Option value="">全部</Option>
                <Option value="1">进行中</Option>
                <Option value="2">已结束</Option>
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
