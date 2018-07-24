/**
 * Created by Staneyffer on 18-6-22.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import post from './post'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		post
	}
})
