import Mock from 'mockjs';
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});
Mock.mock('/getData', 'get', {
  status:200, //请求成功状态码
  dataList:[1,2,3,4,5,6,7,8,9,10] //模拟的请
  })
