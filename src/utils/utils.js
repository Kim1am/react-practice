import React from 'react'
import {Select} from 'antd'
const Option = Select.Option
export default {
  formateDate(time) {
    if (!time) return ''
    let date = new Date(time)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + " " + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  },
  pagination(data, callback) {
    let page = {
      onChange: (current) => {
        callback(current)
      },
      current: data.dataSource.page,
      pageSize: data.dataSource.pageSize,
      total: data.dataSource.total,
      showTotal: () => {
        return `共${data.dataSource.total}`
      },
      showQuickJumper: true
    }
    return page
  },
  getOptionList(data) {
    if (!data) {
      return []
    }
    let options = []
    data.map((item)=>{
      return options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options
  },
  updateSelectedItem(selectedRowKeys,selectedItem) {
    this.setState({
      selectItem: selectedItem,
      selectedRowKeys: selectedRowKeys
    });
  }
}
