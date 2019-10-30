import React, {Component} from 'react'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal} from 'antd'
import axios from '../../axios/index'
import ETable from '../../components/ETable/index'
import menuConfig from '../../config/menuConfig'
import Utils from '../../utils/utils'
import './../../mock/api'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Permission extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      selectedRowKeys: [],
      selectItem: {},
      menuInfo: [], //用户菜单
      isRoleVisible: false,  //创建角色
      isPermVisible: false,   //权限管理,
      mockData: [],  //左边数据，全部
      targetKeys: [],  //右边数据，添加的
      isUserVisible: false //授权管理弹窗
    }
  }

  params = {
    page: 1
  }

  componentDidMount() {
    this.requestList()
  }

  requestList = () => {
    axios.requestList(this, '/permission/list', this.params)
  }
  // 角色创建
  handleRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }
  // 角色提交
  handleRoleSubmit = () => {
    let data = this.userForm.props.form.getFieldsValue();
    axios.ajax({
      url: '/permission/create',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          isRoleVisible: false,
          selectedRowKeys: [],
          selectItem: [],
        })
        this.requestList();
      }
    })
  }
  //权限管理
  handlePermission = () => {
    if (Object.getOwnPropertyNames(this.state.selectItem).length === 0) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermVisible: true,
    });
    let menuList = this.state.selectItem.menus;
    this.setState({
      menuInfo: menuList
    })
  }
  //权限管理提交
  handlePermEditSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    data.role_id = this.state.selectItem.id;
    data.menus = this.state.menuInfo;
    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then((res) => {
      if (res) {
        this.setState({
          selectedRowKeys: [],
          selectItem: {},
          menuInfo: [], //用户菜单
          isPermVisible: false
        })
        this.requestList();
      }
    })
  }
  // 用户授权
  handleUserAuth = () => {
    if (Object.getOwnPropertyNames(this.state.selectItem).length === 0) {
      Modal.info({
        title: '信息',
        content: '未选中任何项目'
      })
      return;
    }
    this.getRoleUserList(this.state.selectItem.id);
    this.setState({
      isUserVisible: true,
      isAuthClosed: false,
    });
  }

  getRoleUserList = (id) => {
    axios.ajax({
      url: '/role/userlist',
      data: {
        params: {
          id: id
        }
      }
    }).then((res) => {
      if (res) {
        this.getAuthUserList(res.dataSource);
      }
    })
  }
  // 筛选目标用户
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status,
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
    }
    this.setState({mockData, targetKeys});
  };
  patchUserInfo = (targetKeys) => {
    console.log(targetKeys)
    this.setState({
      targetKeys: targetKeys
    });
  };
  // 用户授权提交
  handleUserSubmit = () => {
    this.setState({
      mockData: [],  //左边数据，全部
      targetKeys: [],  //右边数据，添加的
      isUserVisible: false //授权管理弹窗
    })
    this.requestList();
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formateDate
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          if (status === 1) {
            return "启用"
          } else {
            return "停用"
          }
        }
      }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      }, {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      }
    ];
    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>创建角色</Button>
          <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
          <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <div className="content-wrap">
          <ETable
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            columns={columns}
          />
        </div>
        <Modal title="创建角色"
               visible={this.state.isRoleVisible}
               onOk={this.handleRoleSubmit}
               onCancel={() => {
                 this.userForm.props.form.resetFields();
                 this.setState({
                   isRoleVisible: false
                 })
               }}
        >
          <UserForm wrappedComponentRef={(inst) => this.userForm = inst}/>
        </Modal>
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}>
          <UserEditForm
            wrappedComponentRef={(inst) => this.roleForm = inst}
            detailInfo={this.state.selectItem || {}}
            menuInfo={this.state.menuInfo || []}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            })
          }}>
          <RoleAuthForm
            wrappedComponentRef={(inst) => this.userAuthForm = inst}
            isClosed={this.state.isAuthClosed}
            detailInfo={this.state.selectItem}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={this.patchUserInfo}
          />
        </Modal>
      </div>
    )
  }
}

export default Permission

class UserForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {
            getFieldDecorator('role_name', {
              initialValue: ''
            })(
              <Input type="text" placeholder="请输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {
            getFieldDecorator('state', {
              initialValue: 1
            })(
              <Select>
                <Option value={1}>开启</Option>
                <Option value={0}>关闭</Option>
              </Select>
            )}
        </FormItem>
      </Form>
    )
  }
}

UserForm = Form.create({})(UserForm);


class UserEditForm extends Component {
  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  };
  renderTreeNodes = data =>
    data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>
        <FormItem label="状态：" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: '1'
          })(
            <Select style={{width: 80}}
                    placeholder="启用"
            >
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          checkedKeys={menuInfo || []}
          onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
        >
          {this.renderTreeNodes(menuConfig)}
        </Tree>
      </Form>
    )
  }
}

UserEditForm = Form.create({})(UserEditForm);


class RoleAuthForm extends Component {
  filterOption = (inputValue, option) => {
    return option.title.indexOf(inputValue) > -1;
  };
  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 18}
    };
    const detail_info = this.props.detailInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>
        <FormItem label="选择用户：" {...formItemLayout}>
          <Transfer
            listStyle={{width: 200, height: 400}}
            dataSource={this.props.mockData}
            showSearch
            titles={['待选用户', '已选用户']}
            searchPlaceholder='输入用户名'
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}

RoleAuthForm = Form.create({})(RoleAuthForm);
