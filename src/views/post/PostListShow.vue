<template>
<!--<div>-->
  <v-card>
		<vm-back-top></vm-back-top>
		<v-container fluid grid-list-lg>
      <v-layout row wrap align-center>
				<v-flex xs12 md12>
					<div v-for="(post, i) in cards" :key="i">
						<post-card :post="post">
						</post-card>
					</div>
				</v-flex>
      </v-layout>
    </v-container>
		<v-pagination :length="totalPages" v-model="page"
									@input="pageChanged"
									:total-visible="7"></v-pagination>
	</v-card>
<!--</div>-->
</template>

<script>
import PostCard from '@/components/PostCard'
import postApi from '@/api/post'

export default {
  name: 'posts',
  // props: ['post'],
  data () {
    return {
      cards: [],
			page: 1,
			totalPages: 0,
    }
  },
	methods: {
		pageChanged(){
			this.getPost()
		},
		getPost() {
			postApi.allPost(this.page).then(res => {
				this.totalPages = res.data.body.totalPages
				this.cards = res.data.body.content
			}).catch(res => {
				this.$log.debug(res)
				// alert('获取文章失败')
			})
		}
	},
  mounted () {
		this.getPost()
  },
  components: {
    PostCard: PostCard
  }
}
</script>
<style scoped>
/*
  .headline{
    margin-left: 30%;
  }*/
</style>
