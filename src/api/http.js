/**
 *  Create by staneyffer
 *  18-2-22
 */

import axios from 'axios'

import {removeStore, getStore} from "../util/storage";

// axios 配置
axios.defaults.timeout = 5000
// axios.defaults.baseURL = process.env.baseUrl
axios.defaults.baseURL = process.env.VUE_APP_BASE_URI

axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.withCredentials = true    // 携带cookie

axios.interceptors.request.use(
	config => {
		let token = getStore('token')
		if (token) {
			// 如果存在登录信息则将其加到请求头中
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	err => {
		// 错误回调
		return Promise.reject(err)
	})

axios.interceptors.response.use(
	response => {
		// 没有错误，直接返回响应
		return response
	},
	error => {
		if (error.response) {
			switch (error.response.status) {
				/**
				 * 这里默认401是用户后台返回的用户登录验证失败的状态码
				 * 验证失败，强制跳转登录界面
				 */
				case 401:
					// store.commit(LOGOUT)
					removeStore('user_id')
					removeStore('token')
					// console.log('验证信息有误')
					/*router.replace({
						path: '/login',
						query: {redirect: router.currentRoute.fullPath}
					})*/
					window.location.href='/login'
					// window.location.replace('/login')
			}
		}
		// console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
		return Promise.reject(error.response.data)
	})

export const request = (url, options = {}, method = 'get') => {
	console.debug('request log: options data at http.js(' + method + ')')
	console.debug(options)
	let key = ~['delete', 'get', 'head'].indexOf(method) ? 'params' : 'data'
	return axios(Object.assign({
		'url': url,
		'method': method,
		// 自定义成功响应为: 状态码200到300之间
		'validateStatus': (status) => {
			return status >= 200 && status < 300
		}
	}, {[key]: options}))
}
