<template>
	<v-card>
		<vm-back-top></vm-back-top>
		<v-container fluid grid-list-lg>
			<v-layout row wrap align-center>
				<v-flex xs10 md10>
					<span class="headline mx-auto">共有{{totalElements}}篇文章</span>
				</v-flex>
				<v-flex xs2 md2>
					<v-btn color="primary" fab small v-if="canEdit" @click="deleteInfo">
						<v-icon>delete</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
			<div v-for="post in posts" :key="post.title">
				<post-card :post="post">
				</post-card>
			</div>
		</v-container>
		<v-pagination :length="totalPages" v-model="page"
									@input="pageChanged"
									:total-visible="7"></v-pagination>
	</v-card>
</template>

<script>
	import PostCard from '@/components/PostCard'
	import postApi from '../api/post'
	import {mapGetters} from 'vuex'

	export default {
		name: "InfoPosts",
		props: ['name', 'type'],
		data() {
			return{
				posts: [],
				page: 1,
				totalPages: 0,
				totalElements: 0
			}
		},
		mounted(){
			this.getPosts()
		},
		computed: {
			...mapGetters({
				isLogin: 'isLogin',
				curUser: 'userInfo'
			}),
			canEdit(){
				return this.isLogin
			}
		},
		methods: {
			pageChanged(){
				this.getPosts()
			},
			getPosts(){
				let $vm = this
				let func = null
				if(this.type === 'category'){
					func = postApi.getPostByCateId
				}else if(this.type === 'section'){
					func = postApi.getPostBySecId
				} else if(this.type === 'tag'){
					func = postApi.getPostByTagId
				}else{
					this.$log.debug('路由 [type] 传参有误, 实际传参为: ' + this.type)
					return null
				}
				func(this.$route.params.id, this.page)
					.then(res => {
						$vm.$log.debug(res.data.body.content)
						$vm.totalPages = res.data.body.totalPages
						$vm.totalElements = res.data.body.totalElements
						$vm.posts = res.data.body.content
					})
					.catch(res => {
						$vm.$log.info('获取分类信息失败')
						$vm.$log.info(res.data)
					})
			},
			routerChange(){
				// 路由发生了变化，更新page = 1
				this.page = 1
				this.getPosts()
			},
			deleteInfo(){
				let $vm = this
				let func = null
				if(this.type === 'category'){
					func = postApi.deleteCateById
				}else if(this.type === 'section'){
					func = postApi.deleteSectionById
				} else if(this.type === 'tag'){
					func = postApi.deleteTagById
				}else{
					this.$log.debug('路由 [type] 传参有误, 实际传参为: ' + this.type)
					return null
				}
				if(!confirm('确认删除吗?')){
					return
				}
				func(this.$route.params.id)
					.then(res => {
						$vm.$log.debug(res)
						$vm.$notify({
							group: 'post',
							title: '删除成功',
						})
						this.$router.push({
							path: '/'
						})
					})
					.catch(res => {
						$vm.$log.debug(res)
						$vm.$notify({
							group: 'post',
							title: '删除失败',
						})
					})
			}
		},
		watch: {
			'$route': 'routerChange'
		},
		components: {
			PostCard: PostCard
		}
	}
</script>

<style scoped>

</style>