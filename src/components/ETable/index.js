import React, {Component} from 'react'
import {Table} from 'antd'


class ETable extends Component {
  constructor(props) {
    super(props)
    this.state = {}

  }
  onSelectChange = (selectedRowKeys, selectedRows)=>{
    this.props.updateSelectedItem(selectedRowKeys,selectedRows)
  }
  onRowClick = (record, index) => {
    let rowSelection = this.props.rowSelection
    if (rowSelection === 'checkbox') {
      let selectedRowKeys = this.props.selectedRowKeys
      let selectedItem = this.props.selectedItem
      if(selectedRowKeys.includes(index)) {
        let i = selectedRowKeys.indexOf(index)
        selectedRowKeys.splice(i,1)
        selectedItem.splice(i,1)
      }else {
        selectedRowKeys.push(index)
        selectedItem.push(record)
      }
      this.props.updateSelectedItem(selectedRowKeys,selectedItem)
    } else {
      let selectedRowKeys = [index]
      let selectedItem = record
      this.props.updateSelectedItem(selectedRowKeys,selectedItem)
    }
  }
  tableInit = () => {
    let rowSelection = this.props.rowSelection
    let selectedRowKeys = this.props.selectedRowKeys
    const ROWSELECTION = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange
    }
    if (rowSelection === false || rowSelection === null) {
      rowSelection = false
    } else if (rowSelection === 'checkbox') {
      ROWSELECTION.type = 'checkbox'
    } else {
      rowSelection = "radio"
    }
    return <Table
      {...this.props}
      rowSelection={rowSelection ? ROWSELECTION : null}
      onRow={(record, index) => {
        return {
          onClick: (event) => {
            if (!rowSelection) {
              return
            }
            this.onRowClick(record, index)
          }, // 点击行
        };
      }}
    />
  }

  render() {
    return (
      <div>
        {this.tableInit()}
      </div>
    )
  }
}

export default ETable

