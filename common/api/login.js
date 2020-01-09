import request from '../utils/request';
import { userURL } from '../utils/config.js'

export function Login (data) { // 登录
	return request(data, userURL + "/public/public/login")
}