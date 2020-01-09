import md5 from 'js-md5';
import cookie from 'js-cookie'
import store from '../store'
let localTimeDif = 0;
function correctionLocalTime (serverTime) {
    var time = serverTime ? (serverTime - parseInt(Date.now() / 1000)) * 1000 : 0;
    return time;
}
function getSnTime() {
    let snTime = new Date().getTime() + (localTimeDif ? parseInt(localTimeDif) : 0);
    return snTime;
}
// 加密数据
function calcSn(data, snTime, token) {
    let obj = Object.assign({},{"snTime": snTime, "token": token}, data);
    let queryString = "";
    let keyArr = Object.keys(obj).sort();
    let len = keyArr.length;
    let i = 0;
    for (; i < len; i++) {
        queryString += keyArr[i] + "=" + obj[keyArr[i]] + "&";
    }
    queryString = queryString.substring(0, queryString.length - 1);
    return md5(queryString);
};
// 格式化请求参数
function formatParam (params) {
    delete params.noCheckLogin
    let token = ""
    let user_token = cookie.get("login_token");
    if (user_token !== undefined && user_token !== "") {
        token = user_token;
    }
    let obj = {
        "body": params,
        "header": {"token":token,"snTime":getSnTime(),"sn":calcSn(params,getSnTime(),token),"from":"wx"}
    }
    return JSON.stringify(obj)
}
function getType(data, method) { // 获取请求方式
	let type = {}
	let obj = formatParam(data)
	if (!method) {
		method = 'POST'
		type = {
			method,
			data: obj,
			headers: {
				'Accept': 'text/plain;',
				'Content-Type': 'application/json',
			}
		}
	} else {
		method = 'get'
		type = {
			method,
			params: {
				...data
			}
		}
	}
	return type
}

function Request(data, url, method) {
	console.log({...getType(data, method)})
	return new Promise((resolve, reject) => {
		//uni.showLoading()
		uni.request({
			url: url,
			credentials: "include",
			...getType(data, method),
			success: res => {
				console.log(res,432112345)
				resolve(res.data)
			},
			fail: err => {
				//uni.hideLoading()
				console.log('err')
				reject(err)
			}
		})
	}).catch(err => console.log(err))
}


export default function(data, url, method) {
	return Request(data, url, method)
}