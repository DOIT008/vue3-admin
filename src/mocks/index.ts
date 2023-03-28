import Mock from 'mockjs';
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600',
});
Mock.mock(RegExp('/api/2.0/login.*'), 'post', () => {
  return {
    status: 200, // 请求成功状态码
    data: {
      token: 'aaa1221adqwaasuiwqe0283q',
    },
  };
});
// 获取用户信息
Mock.mock(RegExp('/api/2.0/userInfo.*'), 'get', () => {
  return {
    status: 200,
    message: '请求列表成功！',
    data: {
      userName: 'admin',
      avatar:
        'https://tse1-mm.cn.bing.net/th/id/OIP-C.IfSiOlQrOF7a_IzH4s92AQAAAA?w=150&h=150&c=7&r=0&o=5&pid=1.7',
    },
  };
});

// 退出登录
Mock.mock('/api/2.0/logout', 'post', () => {
  return {
    status: 200,
    message: 'success',
  };
});
