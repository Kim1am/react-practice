import React, {Component} from 'react'
import {Card, Table,Badge,Button} from 'antd'
import './index.less'
import '../../../mock/api'
import axios from './../../../axios/index'

class HighTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource2: [],
      sortOrder: false
    }
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.ajax({
      url: '/mode1/tableDataOne',
      method: 'get',
      showLoading: true,
      data: {}
    }).then((res) => {
      this.setState({
        dataSource2: res.dataSource.list,
      })
    }, (rej) => {
      console.log(2312312)
    })
  }
  handleChange = (pagination, filters, sorter) => {
    console.log(sorter)
    this.setState({
      sortOrder: sorter.order
    })
  }
  handleDelete = (id) =>{
    console.log(id)
  }
  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 80,
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : "女"
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
      },
      {
        title: '地址',
        dataIndex: 'address',
        width: 120,
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
    ]
    const columns2 = [
      {
        title: 'id',
        dataIndex: 'id',
        fixed: 'left',
        width: 80,
      },
      {
        title: '用户名',
        dataIndex: 'userName',
        width: 80,
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: 80,
        render(sex) {
          return sex === 1 ? '男' : "女"
        },
      },
      {
        title: '状态',
        dataIndex: 'state',
        width: 80,
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        width: 80,
      },
      {
        title: '生日',
        dataIndex: 'birthday',
        width: 120,
      },
      {
        title: '地址',
        dataIndex: 'address',

        width: 120,
      },
      {
        title: '时间',
        dataIndex: 'time',
        fixed: 'right',
        width:120
        // width:120
      },
    ]
    const columns3 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : "女"
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        sorter: (a, b) => {
          return a.age - b.age
        },
        sortOrder: this.state.sortOrder
      },
      {
        title: '状态',
        dataIndex: 'state',
      },
      {
        title: '爱好',
        dataIndex: 'interest',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
    ]
    const columns4 = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'userName',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex === 1 ? '男' : "女"
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': <Badge status="success" text="游泳"></Badge>,
            '2': <Badge status="error" text="打篮球"></Badge>,
          }
          return config[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
      {
        title: '时间',
        dataIndex: 'time',
      },
      {
        title:'操作',
        render:(text,item)=>{
          return <Button size={"small"} onClick={this.handleDelete.bind(this,item.id)}>删除</Button>
    }
      }
    ]
    return (
      <div>
        <Card title="头部固定">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns}
            scroll={{y: 200}}
            dataSource={this.state.dataSource2}
            pagination={false}/>
        </Card>
        <Card title="左侧固定">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns2}
            scroll={{x: 1300, y: 200}}
            dataSource={this.state.dataSource2}
            pagination={false}/>
        </Card>
        <Card title="排序">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns3}
            dataSource={this.state.dataSource2}
            pagination={false} onChange={this.handleChange}/>

        </Card>
        <Card title="操作按钮">
          <Table
            rowKey={record => record.id}
            bordered
            columns={columns4}
            dataSource={this.state.dataSource2}
            pagination={false}/>
        </Card>
      </div>
    )
  }
}

export default HighTable
