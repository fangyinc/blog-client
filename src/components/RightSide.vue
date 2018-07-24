<template>
	<v-container fluid grid-list-lg>
		<v-layout row wrap>
			<v-flex xs12 v-for="(item, index) in items" :key="index">
				<v-card>
					<v-card-title class="right-title" align-center justify-center>{{item.title}}</v-card-title>
					<v-divider></v-divider>
					<v-list>
						<!--:to="action"-->
						<v-list-tile
								:append="true"  v-for="(k, i) in item.data" :key="i"
								@click="toInfo(index, k.info.id)">
							<v-list-tile-content>
								<span>{{k.info.name}}</span>
								<!--<v-list-tile-sub-title  class="right-text">{{k}}</v-list-tile-sub-title>-->
							</v-list-tile-content>
							<v-list-tile-action>
								<!--<v-icon :color="item.active ? 'teal' : 'grey'">chat_bubble</v-icon>-->
								<span>({{k.postCount}})</span>
							</v-list-tile-action>
						</v-list-tile>
					</v-list>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'

	export default {
		name: 'right-side',
		data() {
			return {
				action: '/index',
				items: [],
				infoUrl: ''
			}
		},
		methods: {
			...mapActions([
				'getPostInfo'
			]),
			toInfo(index, id){
				let routerName = ''
				if(index === 0){
					routerName = 'catePosts'
				}else if(index === 1){
					routerName = 'tagPosts'
				}else if(index === 2){
					routerName = 'secPosts'
				}
				this.$router.push({
					name: routerName,
					params: {id: id}
				})
			}
		},
		computed: {
			...mapGetters({
				postInfo: 'postInfo'
			})
		},
		mounted() {
			this.getPostInfo()
			this.items.push(this.postInfo.categories)
			this.items.push(this.postInfo.tags)
			this.items.push(this.postInfo.sections)
		}
	}
</script>

<style scoped>
	.right-title {
		font-size: 25px;
		margin-left: 30%;
	}

	.right-text {
		margin-left: 10%;
	}
</style>
