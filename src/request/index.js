import axios from 'axios'
import store from '@/store'
import { showAlert, hideAlert } from '@/features/alert/alertSlice'

const instance = axios.create({   // 通过使用配置的proxy来解决跨域
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  let token = localStorage.getItem("x-auth-token")
  if (token) {
    config.headers = {
      "x-auth-token": token
    }
  }
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(res => {
  // 对响应数据做点什么  
  // errCode为0时是成功请求
  return res.data
}, (error) => {
  // 对响应错误做点什么
  // errCode：1001账号已存在，1003数据校验失败
  // 由于这里不是组件，所以要调用原生redux
  // 处理在/home下没有合法token的情况下，登录失效并返回/login
  store.dispatch(showAlert({
    alertType: 'warning',
    alertContent: error.response.data.message,
  }))

  setTimeout(() => {
    store.dispatch(hideAlert())
  }, 2000)

  // 根据错误码处理
  if (error.response.data.errCode === 1002) {
    return error    // 直接回到组件的await继续执行，组件中的res接收这个错误
  }

  return Promise.reject(error)
})

export default instance