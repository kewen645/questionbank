import request from './'

// 首页默认数据
export const HomeDefaultApi = () => request.get('/6666')

// 登录接口
export const LoginApi = (params) => request.post('/1024/login', params)

// 注册接口
export const RegisterApi = (params) => request.post('/1024/register', params)

// 进入练习页面(题目分类列表)
export const ChoosePageApi = (params) => request.get(`/1314/${params.actionCode}/${params.testType}`)