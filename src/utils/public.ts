import md5 from 'js-md5';
// 加密
export function handleMD5(account: string, pwd: string, all:string) {
  return md5(account + pwd);
}
