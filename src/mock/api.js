import Mock from 'mockjs';

const url = {
  tableDataOne: /http:\/\/20191015Mock.com\/mode1\/tableDataOne/,
  opencity: /http:\/\/20191015Mock.com\/mode1\/openCity/,
  open:/http:\/\/20191015Mock.com\/mode1\/open/,
  orderList:/http:\/\/20191015Mock.com\/order\/list/,
  orderInfo:/http:\/\/20191015Mock.com\/order\/info/,
  orderFinish:/http:\/\/20191015Mock.com\/order\/finish/,
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
  }),
  Mock.mock(url.orderFinish, 'get', {
    "code": "0",
    "result":"结束成功"
  }),
  Mock.mock(url.orderList, 'get', {
    "code": "0",
    "dataSource":{
      "list|10": [{
        "id|+1": 1,
        "orderSn": /T180[0-9]{6}/,
        "bikeSn": "800116090",
        "userId": 908352,
        "userName": "@cname",
        "mobile": /1[0-9]{10}/,
        "distance":2000,
        "totalTime":4000,
        "status|1-2":1,
        "startTime":"@datetime",
        "endTime":"@datetime",
        "totalFee":1000,
        "userPay":300
      }],
      "page": 1,
      "pageSize": 10,
      "total": 85,
      "page_count": 9,
    }
  }),
  Mock.mock(url.orderInfo, 'get', {
    "code": "0",
    "result":{
      "id|+1": 1,
      "bikeSn": "800116090",
      "battery":30,
      "startTime":"@datetime",
      "location":'@city'
    }
  }),
]

export default list;
