import axios from 'axios'
import { Loading, Message } from 'element-ui'
import qs from 'qs'; // 引入qs模块，用来序列化post类型的数据
import router from '@/router'
//import store from '@/store'

/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: 'http://127.0.0.1:9099', // api的base_url
  timeout: 5000 // 请求超时时间
});

let loading = null
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    let params = config.data || config.params || {}
	
	config.method === 'post'
	  ? config.data = qs.stringify({...config.data})
	  : config.params = {...config.params};
	  
	config.headers['Content-Type'] = 'application/json;charset=UTF-8';  
	
    if (!params._hiding) { // 默认情况调用接口时，弹出遮盖，上送_hiding时不显示遮盖
      loading = Loading.service({
        spinner: 'el-icon-loading'
      })
    }
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token')
    }
    // 在发送请求之前做些什么
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    loading && loading.close()
    if (response.headers.authorization) {
      sessionStorage.setItem('token', response.headers.authorization)
    }
    if (response.status === 200) {
      return response.data
    } else if (response.status === 70002) {
      Message.error(response.data.msg)
      router.push('/login')
      return Promise.reject(response.data.msg)
    } else if (response.request.responseType === 'blob') {
      return response
    } else {
      Message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    }
  },
  function (error) {
    loading && loading.close()
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service
