import JsonP from 'jsonp'
import axios from 'axios';
import {message} from 'antd'
export default class Axios {
  static jsonp(options) {
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    }).catch((e) => {
      console.log(e)
    });
  }

  static ajax(options) {
    if(options.showLoading) {
      document.getElementById('ajaxLoading').style.display = 'block'
    }
    const  baseApi = 'http://20191015Mock.com'
    return new Promise((resolve, reject) => {
      axios({
        url:options.url,
        method:options.method,
        baseURL:baseApi,
        timeout:5000,
        params:(options.data && options.data.params) || '',
      }).then((response)=>{
        if(options.showLoading) {
          document.getElementById('ajaxLoading').style.display = 'none'
        }
        if(response.status === 200) {
          let res = response.data
          if(res.code === '0') {
            resolve(res)
          }else {
            reject(res)
            message.error(res.msg ? res.msg : '',3)
          }
        }else {
          reject(response.data)
        }
      })
    })
  }
}
