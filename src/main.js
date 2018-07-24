import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Notifications from 'vue-notification'
import vueg from 'vueg'
import 'vueg/css/transition-min.css'

/*
* 因为Vuetify的 <code>的样式和 markdown的代码样式有冲突，所以直接复制vuetify的样式文件
* 并修改其中的app.styl文件去掉_code.styl
* */
require('./assets/vuetify/stylus/app.styl')

import VueLogger from 'vuejs-logger'
import {loggerConfig} from './util/config'

Vue.config.productionTip = false

import {
	Vuetify,
	VApp,
	VNavigationDrawer,
	VFooter,
	VList,
	VBtn,
	VIcon,
	VToolbar,
	VAvatar,
	VBadge,
	VCard,
	VCheckbox,
	VChip,
	VDialog,
	VDivider,
	VForm,
	VMenu,
	VPagination,
	VRadioGroup,
	VSelect,
	VSlider,
	VSnackbar,
	VSubheader,
	VTabs,
	VTextField,
	VGrid,
	VAutocomplete,
	VCombobox,
	VProgressLinear,
	VProgressCircular
} from 'vuetify'

import VmBackTop from 'vue-multiple-back-top'

// import  from 'vuetify/es5/components/'

Vue.use(Vuetify, {
	components: {
		VApp,
		VNavigationDrawer,
		VFooter,
		VList,
		VBtn,
		VIcon,
		VToolbar,
		VAvatar,
		VBadge,
		VCard,
		VCheckbox,
		VChip,
		VDialog,
		VDivider,
		VForm,
		VMenu,
		VPagination,
		VRadioGroup,
		VSelect,
		VSlider,
		VSnackbar,
		VSubheader,
		VTabs,
		VTextField,
		VGrid,
		VAutocomplete,
		VCombobox,
		VProgressLinear,
		VProgressCircular
	}
})

Vue.use(VueLogger, loggerConfig)
Vue.use(mavonEditor)
Vue.use(Notifications)
Vue.component(VmBackTop.name, VmBackTop)
Vue.use(vueg, router) // vue transition
new Vue({
	router,
	store,
	render: h => h(App),
	metaInfo: {
		title: '程方银的博客'
	}
}).$mount('#app')
