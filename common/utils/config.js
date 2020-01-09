const requestURL = 'http://race.iyundong.me'; // ajax请求地址
const userURL = 'http://user.iyundong.me';
if(process.env.NODE_ENV === 'development'){
    console.log('开发环境')
}else{
    console.log('生产环境')
}
export { userURL, requestURL }