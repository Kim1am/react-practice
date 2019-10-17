import React, {Component} from 'react'
import {Card, Table, Button} from 'antd'
import './index.less'
import '../../../mock/api'
import Utils from '../../../utils/utils'
import axios from './../../../axios/index'


class BasicTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      dataSource2: [],
      dataSource3: [],
      selectedRowKeys: [],
      selectedRowKeysChecked: [],
      selectItem: null,
    }
  }
  //分页变量
  params={
    page:1
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
    let _this = this
    axios.ajax({
      url: '/mode1/tableDataOne',
      method:'get',
      showLoading: true,
      data: {
        params:{
          page:this.params.page
        }
      }
    }).then((res) => {
      console.log(res)
      this.setState({
        dataSource2: res.dataSource.list,
        dataSource3: res.dataSource.list,
        pagination:Utils.pagination(res,(current)=>{
          //TODO:
          _this.params.page = current
          _this.requestList()
        })
      })
    },(rej)=>{
      console.log(2312312)
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectItem: record
    })
  }

  handleDelete = () => {
    let selectedKey = this.state.selectedRowKeysChecked
    const afterFilter = this.state.dataSource3.filter((item)=>{
      return !selectedKey.includes(item.id-1)
    })
    this.setState({
      dataSource3:afterFilter,
      selectedRowKeysChecked: []
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
      selectedRowKeys: this.state.selectedRowKeys
    }
    const rowCheckSelection = {
      type: "checkbox",
      selectedRowKeys: this.state.selectedRowKeysChecked,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeysChecked: selectedRowKeys
        })
      }
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
        <Card title="Mock-复现">
          <Button onClick={this.handleDelete}>删除</Button>
          <Table
            rowSelection={rowCheckSelection}
            rowKey={record => (record.id - 1)}
            bordered
            columns={columns}
            dataSource={this.state.dataSource3}
            pagination={false}/>
        </Card>
        <Card title="Mock-分页">
          <Table
            rowKey={record => (record.id - 1)}
            bordered
            columns={columns}
            dataSource={this.state.dataSource3}
            pagination={this.state.pagination}/>
        </Card>
      </div>
    )
  }
}

export default BasicTable
