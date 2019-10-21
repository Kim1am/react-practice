import Mock from 'mockjs';

const url = {
  tableDataOne: /http:\/\/20191015Mock.com\/mode1\/tableDataOne/,
  opencity: /http:\/\/20191015Mock.com\/mode1\/openCity/,
  open:/http:\/\/20191015Mock.com\/mode1\/open/
}
const list = [
  Mock.mock(url.tableDataOne, 'get', {
    'code|1': ['0', '1'],
    'msg': '1231313131233asdasdadas',
    'dataSource': {
      "list|5": [{
        'id|+1': 1,
        'userName|1': '@cname',
        'sex|1': ['1', '2'],
        'state|1': ['1', '2'],
        'age|0-100': 0,
        'interest|1': ['1', '2'],
        'birthday': '@date("yyyy-MM-dd")',
        'address': '12312313123',
        'time': '@time("H:m")'
      }],
      page: 1,
      pageSize: 5,
      total: 100
    },
  }),
  Mock.mock(url.opencity, 'get', {
    "code": "0",
    "dataSource":{
      "list|10": [{
        "id|+1": 1,
        "name": "@city",
        "mode|1-2": 1,
        "opMode|1-2": 1,
        "franchiseeId": 77,
        "franchiseeName": "松果",
        "cityAdmins|1-2": [{
          "userName": "@cname",
          "userId|+1": 10001
        }],
        "openTime":"@datetime",
        "sysUserName":"@cname",
        "updateTime":'@datetime'
      }],
      "page": 1,
      "pageSize": 10,
      "total": 60,
      "page_count": 6,
    }
  }),
  Mock.mock(url.open, 'get', {
    "code": "0",
    "result":"开通成功"
  })
]

export default list;
