<template>
	<v-navigation-drawer
			v-model="drawer"
			app
			@input="handleInput">
		<v-card>
			<v-card-media src="https://my-blog-images.oss-cn-qingdao.aliyuncs.com/oss_test3.jpg" height="300px">
				<v-layout column class="media">
					<router-link to="/">
						<v-card-title>
							<v-avatar
									:tile="tile"
									:size="avatarSize"
									class="grey lighten-4"
									to="/"
							>
								<img src="https://my-blog-images.oss-cn-qingdao.aliyuncs.com/about_225.jpg" alt="avatar">
							</v-avatar>
						</v-card-title>
					</router-link>
					<v-spacer></v-spacer>
					<v-card-title class="white--text pl-5 pt-5">
						<div class="display-1 pl-2 pt-5">{{user.username}}</div>
						<span class="title">
							{{user.signature}}
						</span>
					</v-card-title>
				</v-layout>
			</v-card-media>
			<v-list class="pt-0" dense>
				<v-divider></v-divider>
				<v-list-tile v-for="(item, index) in menuItems" :key="index" :to="item.url" v-if="item.active">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.name }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
				<v-divider></v-divider>

				<v-list-group
						v-for="(item, infoIndex) in postInfoItems"
						v-model="item.active"
						:key="item.title"
						:prepend-icon="item.icon"
						no-action
				>
					<v-list-tile slot="activator">
						<v-list-tile-content>
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile
							v-for="subItem in item.data" :key="subItem.title"
							@click="clickPostInfoItems(infoIndex, subItem.info.id)">
						<v-list-tile-content>
							<v-list-tile-title>{{ subItem.info.name }}</v-list-tile-title>
						</v-list-tile-content>
						<v-list-tile-action>
							<span>({{subItem.postCount}})</span>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
			</v-list>
		</v-card>

	</v-navigation-drawer>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	export default {
		name: 'nv-drawer',
		props: ['drawer', 'user', 'menuItems'],
		data: () => {
			return {
				postInfoItems: [],
				avatarSize: 100,
				tile: false	// 头像边框形状（false为圆形）
			}
		},
		methods: {
			...mapActions([
				'getPostInfo'
			]),
			handleInput() {
				this.$emit('update:drawer', this.drawer)
			},
			handleClick() {
			},
			initPostInfo() {
				this.postInfoItems.push({title: '分类', data: this.postInfo.categories, icon: 'note'})
				this.postInfoItems.push({title: '标签', data: this.postInfo.tags, icon: 'bookmark'})
				this.postInfoItems.push({title: '专栏', data: this.postInfo.sections, icon: 'view_column'})
			},
			clickPostInfoItems(infoIndex, itemId){
				let routerName = ''
				if(infoIndex === 0){
					routerName = 'catePosts'
				}else if(infoIndex === 1){
					routerName = 'tagPosts'
				}else if(infoIndex === 2){
					routerName = 'secPosts'
				}
				this.$router.push({
					name: routerName,
					params: {id: itemId}
				})
			}
		},
		mounted() {
			// this.initPostInfo()
			this.getPostInfo()
			this.postInfoItems.push(this.postInfo.categories)
			this.postInfoItems.push(this.postInfo.tags)
			this.postInfoItems.push(this.postInfo.sections)
		},
		computed: {
			...mapGetters({
				postInfo: 'postInfo'
			})
		}
	}
</script>

<style scoped>

</style>
