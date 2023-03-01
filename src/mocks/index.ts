import Mock from 'mockjs';
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});
Mock.mock('/api/2.0/login', 'post', () => { 
  return {
    status:200, //请求成功状态码
    data: {
      token: 'aaa1221adqwaasuiwqe0283q',
      userName:'张三'
    } //模拟的请
  }
})
Mock.mock('/api/2.0/userInfo','get',(options)=>{
  return {
      status:200,
      message:'请求列表成功！',
      total:20,
  }
})