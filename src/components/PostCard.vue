<template>
	<!--to="/show-post"-->
	<!-- :to="postUrl" -->
	<v-card class="my-3" hover :to="postUrl">
		<v-card-media
				class="white--text"
				height="200px"
				:src="post.img">
		</v-card-media>
		<v-container fill-height fluid>
			<v-layout fill-height>
				<v-flex xs12 align-end flexbox>
					<span class="headline">{{ post.title }}</span>
				</v-flex>
			</v-layout>
		</v-container>

		<!--<v-card-text v-show="true">
			{{post.summary}}
			<span>...</span>
		</v-card-text>-->

		<v-card-title v-show="true">
			<span>{{post.summary}}...</span>
		</v-card-title>

		<v-divider></v-divider>

		<v-card-actions>
			<!-- prevent: 提交事件不再重载页面 -->
			<a @click.prevent="toInfo(cateRouter, post.category.id)" style="text-decoration: none; color:black">
				<v-icon>note</v-icon>
				<span>{{post.category.name}}</span>
			</a>

			<div
					v-bind:class="{'hidden-sm-and-down': true}"
					v-for="tag in post.tags" :key="tag.id">
				<a @click.prevent="toInfo(tagRouter, tag.id)" style="text-decoration: none; color:black">
					<v-icon>bookmark</v-icon>
					<span>{{tag.name}}</span>
				</a>
			</div>
			<div
					v-bind:class="{'hidden-sm-and-down': true}"
					v-for="(sec, index) in post.sections" :key="index">
				<a @click.prevent="toInfo(secRouter, sec.id)" style="text-decoration: none; color:black">
					<v-icon>view_column</v-icon>
					<span>{{sec.name}}</span>
				</a>
			</div>
			<v-spacer></v-spacer>
			<v-icon>date_range</v-icon>
			<span>{{post.createTime}}</span>
			<v-btn flat color="blue" :to="postUrl">更多</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
	export default {
		name: 'post-card',
		props: ['post'],
		data() {
			return {
				postUrl: '/post/',
				cateRouter: 'catePosts',
				tagRouter: 'tagPosts',
				secRouter: 'secPosts'
			}
		},
		mounted(){
			this.postUrl += this.post.id
		},
		methods: {
			toInfo(routerName, id){
				this.$router.push({
					name: routerName,
					params: {id: id}
				})
			}
		}
	}
</script>

<style scoped>
	/*
		.headline {
			margin-left: 30%;
		}*/
</style>
