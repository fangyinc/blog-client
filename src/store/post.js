/**
 * Created by Staneyffer on 18-6-25.
 */

import postApi from '@/api/post'
import {SAVE_CATEGORIES, SAVE_SECTIONS, SAVE_TAGS} from './mutation-types'

const state = {
	categories: [],
	tags: [],
	sections: [],
	postInfo: {
		categories: {title: '分类', data: []},
		tags: {title: '标签', data: []},
		sections: {title: '专栏', data: []}
	}
}

const getters = {
	// categories: state => state.categories,
	// tags: state => state.tags,
	// sections: state => state.sections
	postInfo: state => state.postInfo
}

const actions = {
	getPostInfo({commit}) {
		postApi.getALlCate().then(res => {
			commit(SAVE_CATEGORIES, res.data.body)
		}).catch(res => {
			console.error(res.data)
		})
		postApi.getAllTag().then(res => {
			commit(SAVE_TAGS, res.data.body)
		}).catch(res => {
			console.error(res.data)
		})
		postApi.getAllSection().then(res => {
			commit(SAVE_SECTIONS, res.data.body)
		}).catch(res => {
			console.error(res.data)
		})
	}
}
const mutations = {
	[SAVE_CATEGORIES](state, data){
		state.postInfo.categories.data = data
	},
	[SAVE_TAGS](state, data){
		state.postInfo.tags.data = data
	},
	[SAVE_SECTIONS](state, data){
		state.postInfo.sections.data = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
