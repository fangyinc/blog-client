<template>
	<v-app>
		<my-head
				:drawer.sync="drawer"
				:menuItems="menuItems"
				:user="user"></my-head>
		<!--toolbar-> dark color="primary"-->
		<v-toolbar app fixed >
			<v-toolbar-side-icon @click="show" v-if="!drawer"></v-toolbar-side-icon>
			<v-btn icon v-if="drawer" @click="drawer=!drawer">
				<v-icon>close</v-icon>
			</v-btn>
			<router-link to="/" style="text-decoration: none; color:black">
				<v-toolbar-title v-if="!showSearch" v-bind:class="{'hidden-sm-and-down': false}">Staneyffer</v-toolbar-title>
			</router-link>
			<v-spacer v-bind:class="{'hidden-sm-and-down': true}">
			</v-spacer>
			<!--<v-container fluid>-->
			<v-layout row wrap>
				<!--<v-flex lg6>-->
				<!--</v-flex>-->
				<v-flex md6 xs10>
					<v-btn
							icon v-if="!showSearch"
							@click="handleSBT"
							v-bind:class="{'hidden-md-and-up': true}"
							style="margin-left: 70%;">
						<v-icon>search</v-icon>
					</v-btn>
					<search-post v-bind:class="{'hidden-sm-and-down': true}"></search-post>
					<search-post style="margin-top: 3%" v-if="showSearch"></search-post>
				</v-flex>
				<v-flex md4 offset-md1 v-bind:class="{'hidden-sm-and-down': true}">
					<v-layout row wrap>
						<v-flex v-for="(item, i) in menuItems" :key="i" v-if="item.active">
							<v-btn icon :to="item.url">
								<v-icon>{{item.icon}}</v-icon>
								<span>{{item.name}}</span>
							</v-btn>
						</v-flex>
						<v-flex v-bind:class="{'hidden-sm-and-down': true}" v-if="isLogin">
							<v-menu offset-y>
								<v-btn slot="activator" flat>用户</v-btn>
								<v-list>
									<v-list-tile
											v-for="(item, index) in userMenuItems" :key="index"
											@click="userMenuItemChange(index)">
										<v-list-tile-title>{{ item.name }}</v-list-tile-title>
									</v-list-tile>
								</v-list>
							</v-menu>
						</v-flex>
					</v-layout>
				</v-flex>

				<v-flex md1 xs1 v-bind:class="{'hidden-md-and-up': true}">
					<v-menu bottom left min-width="100px" style="margin-left: 80%; margin-top: 55%">
						<!--<v-btn slot="activator" icon dark>
							<v-icon>more_vert</v-icon>
						</v-btn>-->
						<v-icon slot="activator">more_vert</v-icon>
						<v-list>
							<v-list-tile v-for="(item, i) in menuItems" :key="i" :to="item.url" v-if="item.active">
								<v-list-tile-title>{{ item.name }}</v-list-tile-title>
							</v-list-tile>
							<v-list-tile
									v-if="isLogin"
									v-for="(item, index) in userMenuItems" :key="item.name"
									@click="userMenuItemChange(index)">
								<v-list-tile-title>{{ item.name }}</v-list-tile-title>
							</v-list-tile>

						</v-list>
					</v-menu>
				</v-flex>
			</v-layout>
		</v-toolbar>

		<notifications group="user" position="top center" :duration="1500"/>
		<notifications group="post" position="top center" :duration="1500"/>

		<v-content>
			<v-container fluid>
				<router-view  v-transition></router-view>
			</v-container>
		</v-content>
		<v-footer app></v-footer>

	</v-app>
</template>

<script>
	import NvDrawer from '../components/NvDrawer'
	import RightSide from '../components/RightSide'
	import SearchPost from '../components/SearchPost'
	import {mapActions, mapGetters} from 'vuex'

	export default {
		name: 'Base',
		data: () => {
			return {
				drawer: false,
				showSearch: false,
				appendIcon: null,
				hiddenTitle: false,
				menuItems: [
					{url: '/archive', name: '归档', icon: 'archive', active: true},
					{url: '/friend', name: '友链', icon: 'link', active: true},
					{url: '/register', name: '注册', icon: 'person_add', active: true},
					{url: '/login', name: '登录', icon: 'person', active: true},
				],
				userMenuItems: [
					{name: '账户', url: '/zhanghu'},
					{name: '写文章', url: '/zhanghu'},
					{name: '添加友链', url: '/new-friend'},
					{name: '注销', url: '/zhanghu'}
				],
				windowSize: {
					x: 0,
					y: 0
				}
			}
		},
		methods: {
			...mapActions([
				'readToken',
				'getUserInfo',
				'logout',
				'getPostInfo'
			]),
			show() {
				this.drawer = !this.drawer
			},
			handleSBT() {
				this.showSearch = !this.showSearch
				this.hiddenTitle = true
			},
			searchChange() {
				if (this.appendIcon === null) {
					this.appendIcon = 'clear'
				} else {
					this.appendIcon = null
				}
				this.showSearch = false
				// this.hiddenTitle = false
			},
			userMenuItemChange(itemIndex) {
				if (itemIndex === 1) {
					this.$router.push({
						path: '/new-post'
					})
				}else if(itemIndex === 2){
					this.$router.push({
						path: '/new-friend'
					})
				} else if (itemIndex === 3) {
					this.logout()
					this.getUserInfo()
					this.$router.push({
						path: '/'
					})
				}
			},
			onResize() {
				this.windowSize = {x: window.innerWidth, y: window.innerHeight}
			}
		},
		components: {
			// myHead: baseHeader
			myHead: NvDrawer,
			rightSide: RightSide,
			searchPost: SearchPost
		},
		mounted() {
			this.readToken()
			this.getUserInfo()
		},
		created() {
		},
		computed: {
			...mapGetters({
				user: 'userInfo',
				isLogin: 'isLogin'
			})
		},
		watch: {
			/**
			 * 监听isLogin的变化(是否登录)
			 */
			isLogin() {
				if (this.isLogin) {
					this.menuItems[2].active = false
					this.menuItems[3].active = false
				} else {
					this.menuItems[2].active = true
					this.menuItems[3].active = true
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	/*@import '~vuetify/src/stylus/main'*/
</style>