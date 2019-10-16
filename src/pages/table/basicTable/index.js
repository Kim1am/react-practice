import React, {Component} from 'react'
import {Card, Table} from 'antd'
import './index.less'
import '../../../mock/api'
import axios from './../../../axios/index'

class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataSource2: [],
      selectedRowKeys: [],
      selectItem: null
    }
  }

  componentDidMount() {

    const dataSource = [
      {
        id: '0',
        userName: 'jack',
        sex: '1',
        state: '2',
        interest: '3',
        birthday: '2019-04-09',
        address: '12312313123',
        time: '23:50'
      },
      {
        id: '1',
        userName: 'jack',
        sex: '1',
        state: '2',
        interest: '3',
        birthday: '2019-04-09',
        address: '12312313123',
        time: '23:50'
      },
      {
        id: '2',
        userName: 'jack',
        sex: '1',
        state: '2',
        interest: '3',
        birthday: '2019-04-09',
        address: '12312313123',
        time: '23:50'
      },
    ]
    this.setState({dataSource})
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/mode1/tableDataOne',
      showLoading: true,
      data: {}
    }).then((res) => {
      this.setState({
        dataSource2: res.dataSource
      })
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectItem: record
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : "女"
        }
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '时间',
        dataIndex: 'time'
      },
    ]
    const rowSelection = {
      type: "radio",
      selectedRowKeys:this.state.selectedRowKeys
    }
    return (
      <div>
        <Card title="基础表格">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}/>
        </Card>
        <Card title="动态数据表格">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}/>
        </Card>
        <Card title="Mock-单选">
          <Table
            onRow={(record, index) => {
              return {
                onClick: (event) => {
                  this.onRowClick(record, index)
                }, // 点击行
              };
            }}
            rowSelection={rowSelection}
            rowKey={record => (record.id - 1)}
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}/>
        </Card>
      </div>
    )
  }
}

export default BasicTable
