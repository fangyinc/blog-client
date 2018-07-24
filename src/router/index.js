/**
 * Created by Staneyffer on 18-6-22.
 */

import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import Meta from 'vue-meta'

// import {beforeHook} from './hooks'
Vue.use(Router)
Vue.use(Meta)
const router = new Router({
	mode: 'history' // history模式，部署服务器需要单独配置404页面
})

// router.beforeEach(beforeHook)
router.addRoutes(routers)
export default router
