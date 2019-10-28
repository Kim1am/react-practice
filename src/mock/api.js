import Mock from 'mockjs';

const url = {
  tableDataOne: /http:\/\/20191015Mock.com\/mode1\/tableDataOne/,
  opencity: /http:\/\/20191015Mock.com\/mode1\/openCity/,
  open: /http:\/\/20191015Mock.com\/mode1\/open/,
  orderList: /http:\/\/20191015Mock.com\/order\/list/,
  orderInfo: /http:\/\/20191015Mock.com\/order\/info/,
  orderFinish: /http:\/\/20191015Mock.com\/order\/finish/,
  orderDetail: /http:\/\/20191015Mock.com\/order\/detail/,
  userList: /http:\/\/20191015Mock.com\/user\/list/,
  userDelete:/http:\/\/20191015Mock.com\/user\/delete/,
  userEdit:/http:\/\/20191015Mock.com\/user\/edit/,
  userCreate:/http:\/\/20191015Mock.com\/user\/create/,
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
    "dataSource": {
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
        "openTime": "@datetime",
        "sysUserName": "@cname",
        "updateTime": '@datetime'
      }],
      "page": 1,
      "pageSize": 10,
      "total": 60,
      "page_count": 6,
    }
  }),
  Mock.mock(url.open, 'get', {
    "code": "0",
    "result": "开通成功"
  }),
  Mock.mock(url.userDelete, 'get', {
    "code": "0",
    "result": "删除成功"
  }),
  Mock.mock(url.userEdit, 'get', {
    "code": "0",
    "result": "编辑成功"
  }),
  Mock.mock(url.userCreate, 'get', {
    "code": "0",
    "result": "创建成功"
  }),
  Mock.mock(url.orderFinish, 'get', {
    "code": "0",
    "result": "结束成功"
  }),
  Mock.mock(url.orderList, 'get', {
    "code": "0",
    "dataSource": {
      "list|10": [{
        "id|+1": 1,
        "orderSn": /T180[0-9]{6}/,
        "bikeSn": "800116090",
        "userId": 908352,
        "userName": "@cname",
        "mobile": /1[0-9]{10}/,
        "distance": 2000,
        "totalTime": 4000,
        "status|1-2": 1,
        "startTime": "@datetime",
        "endTime": "@datetime",
        "totalFee": 1000,
        "userPay": 300
      }],
      "page": 1,
      "pageSize": 10,
      "total": 85,
      "page_count": 9,
    }
  }),
  Mock.mock(url.orderInfo, 'get', {
    "code": "0",
    "result": {
      "id|+1": 1,
      "bikeSn": "800116090",
      "battery": 30,
      "startTime": "@datetime",
      "location": '@city'
    }
  }),
  Mock.mock(url.userList, 'get', {
    "code": "0",
    "message": "",
    "dataSource": {
      "list|10": [{
        "id|+1": 1,
        "username": "@cname",
        "sex|1-2": 1,
        "state|1-5": 1,
        "interest|1-8": 1,
        "isMarried|0-1": 1,
        "birthday": "2000-01-01",
        "address": "北京市海淀区",
        "time": "09:00:00"
      }],
      page: 1,
      page_size: 10,
      total_count: 30
    }
  }),
  Mock.mock(url.orderDetail, 'get', {
    "code": '0',
    "msg": '',
    "result": {
      "status": 2,
      "order_sn": "T1803244422704080JGJI",
      "bike_sn": "802410001",
      "mode|1-2": 1,
      "start_location": "北京市昌平区回龙观东大街",
      "end_location": "北京市海淀区奥林匹克公园",
      "city_id": 1,
      "mobile": "13597482075",
      "user_name": "@cname",
      "distance": 10000,
      "bike_gps": "116.398806,40.008637",
      "start_time": 1521865027000,
      "end_time": 1521865251000,
      "total_time": 224,
      "position_list": [{
        "lon": 116.361221,
        "lat": 40.043776
      }, {
        "lon": 116.363736,
        "lat": 40.038086
      }, {
        "lon": 116.364599,
        "lat": 40.036484
      }, {
        "lon": 116.373438,
        "lat": 40.03538
      }, {
        "lon": 116.377966,
        "lat": 40.036263
      }, {
        "lon": 116.379762,
        "lat": 40.03654
      }, {
        "lon": 116.38084,
        "lat": 40.033225
      }, {
        "lon": 116.38084,
        "lat": 40.029413
      }, {
        "lon": 116.381343,
        "lat": 40.021291
      }, {
        "lon": 116.381846,
        "lat": 40.015821
      }, {
        "lon": 116.382637,
        "lat": 40.008084
      }, {
        "lon": 116.398806,
        "lat": 40.008637
      }],
      "area": [{
        "lon": "116.274737",
        "lat": "40.139759",
        "ts": null
      },
        {
          "lon": "116.316562",
          "lat": "40.144943",
          "ts": null
        },
        {
          "lon": "116.351631",
          "lat": "40.129498",
          "ts": null
        },
        {
          "lon": "116.390582",
          "lat": "40.082481",
          "ts": null
        },
        {
          "lon": "116.38742",
          "lat": "40.01065",
          "ts": null
        },
        {
          "lon": "116.414297",
          "lat": "40.01181",
          "ts": null
        },
        {
          "lon": "116.696242",
          "lat": "39.964035",
          "ts": null
        },
        {
          "lon": "116.494498",
          "lat": "39.851306",
          "ts": null
        },
        {
          "lon": "116.238086",
          "lat": "39.848647",
          "ts": null
        },
        {
          "lon": "116.189454",
          "lat": "39.999418",
          "ts": null
        },
        {
          "lon": "116.244646",
          "lat": "39.990574",
          "ts": null
        },
        {
          "lon": "116.281441",
          "lat": "40.008703",
          "ts": null
        },
        {
          "lon": "116.271092",
          "lat": "40.142201",
          "ts": null
        },
        {
          "lon": "116.271092",
          "lat": "40.142201",
          "ts": null
        }
      ],
      "area_list": null,
      "npl_list": [{
        "id": 8265,
        "name": "北辰世纪中心-a座",
        "city_id": 1,
        "type": 3,
        "status": 0,
        "map_point": "116.39338796444|40.008120315215;116.39494038009002|40.008177258745;116.39496911688|40.006268094213;116.39512457763|40.004256795877;116.39360214742|40.004222412241;116.39357190147|40.005075745782;116.39351397873|40.005836165232;116.39338796444|40.008120315215",
        "map_point_array": ["116.39338796444|40.008120315215", "116.396053|40.008273", "116.396448|40.006338", "116.396915|40.004266", "116.39192|40.004072", "116.391525|40.004984", "116.391381|40.005924", "116.391166|40.007913"],
        "map_status": 1,
        "creator_name": "赵程程",
        "create_time": 1507863539000
      }]
    }
  }),
]

export default list;
