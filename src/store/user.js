/**
 * Created by Staneyffer on 18-6-22.
 */

import {LOGOUT, LOGIN, SAVE_USER, READ_USER, IS_AUTHOR} from './mutation-types'
import {setStore, getStore, removeStore} from '../util/storage'
import authApi from '../api/user'

let defaultUserId = process.env.VUE_APP_DEFAULT_USER
const state = {
	user: {},
	token: null,
	isLogin: false
}

const getters = {
	userInfo: state => state.user,
	isLogin: state => state.isLogin
}

const actions = {
	login({commit}, loginData) {
		commit(LOGIN, loginData)
	},
	logout({commit}) {
		commit(LOGOUT)
	},
	getUserInfo({commit}) {
		let userId = getStore('user_id')
		if(userId === null){
			userId = defaultUserId
		}
		authApi.getUser(userId).then(res => {
			commit(SAVE_USER, res.data.body)
		}).catch(res => {
			console.log('获取用户信息失败, status: ' + res.status)
			commit(LOGOUT)
		})
	},
	readToken({commit}) {
		commit(READ_USER);
	},
	isAuthor({commit}, user){
		return commit(IS_AUTHOR, user)
	}
}

const mutations = {
	[LOGIN](state, loginData) {
		console.log(loginData)
		state.token = loginData.token
		state.isLogin = true
		state.user = loginData.user
		setStore('token', loginData.token)
		setStore('user_id', loginData.user.id)
	},
	/**
	 * 退出登录 并清除token和用户account
	 * @param state
	 */
	[LOGOUT](state) {
		state.user = {}
		state.isLogin = false
		state.token = null
		removeStore('user_id')
		removeStore('token')
	},
	[SAVE_USER](state, userInfo) {
		state.user = userInfo
	},
	// 读取存在本地的token信息
	[READ_USER](state) {
		state.token = getStore('token')
		if(state.token !== null){
			state.isLogin = true
		}else{
			state.user = {}
			state.isLogin = false
			state.token = null
		}
	},
	[IS_AUTHOR](state, user){
		if(!state.isLogin){
			return false
		}
		if(user.id === state.user.id){
			return true
		}else{
			return false
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
