import Mock from 'mockjs';
const url = {
  tableDataOne: /http:\/\/20191015Mock.com\/mode1\/tableDataOne/
}
const list =[
  Mock.mock(url.tableDataOne,'get', {
    'code|1':['0','1'],
    'msg':'1231313131233asdasdadas',
    'dataSource':{
      "list|5":[{
        'id|+1': 1,
          'userName|1':'@cname',
        'sex|1': ['1', '2'],
        'state|1': ['1', '2'],
        'interest|1': ['1', '2'],
        'birthday': '@date("yyyy-MM-dd")',
        'address': '12312313123',
        'time': '@time("H:m")'
      }],
      page:1,
      pageSize:5,
      total:100
    },
  })
]

export default list;
