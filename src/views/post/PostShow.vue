<template>
	<div>
		<show-post :post="post"></show-post>
		<!--<v-divider></v-divider>-->
		<br/>
		<v-card class="elevation-4" v-if="commentsLength">
			<!--<vm-back-top></vm-back-top>-->
			<v-card-title>
				<div class="headline">
					<span>留言 ({{post.comments.length}}条)</span>
				</div>
			</v-card-title>
			<v-container fluid grid-list-sm>
				<v-layout row wrap align-center>
					<v-flex v-for="(comment, i) in post.comments" :key="i" xs12 md12>
						<!--<div >-->
						<show-comment
								:comment="comment"
								:canEdit="canEdit"
								@delete="deleteComment"
								@reply="handleReply"></show-comment>
						<!--</div>-->
					</v-flex>
				</v-layout>
			</v-container>
			<!--<v-pagination :length="post.comments.length" v-model="page"
										@input="pageChanged"
										:total-visible="7"></v-pagination>-->
		</v-card>

		<comment-editor id="cmd"
										:content="commentContent" :user="commentUser"
										@upload="uploadComment"
										@change="commentChange"></comment-editor>

	</div>
</template>

<script>
  import postApi from '../../api/post'
  import ShowPost from '../../components/ShowPost'

  import CommentEditor from '../../components/CommentEditor'
  import ShowComment from '../../components/ShowComment'
  import commentApi from '../../api/comment'
  import {mapGetters} from 'vuex'

  export default {
    name: "post",
    data() {
      return {
        post: {},
        codeStyle: '',

        commentContent: '',
        commentUser: {
          name: '',
          email: '',
          siteUrl: ''
        },
      }
    },
    mounted() {
      this.getPost()
    },
    methods: {
      getPost() {
        let $vm = this;
        postApi.getPostById(this.$route.params.post_id)
          .then(res => {
            $vm.post = res.data.body
            console.log(res.data)
          })
          .catch(res => {
            this.$log.debug(res)
            // alert('获取文章失败')
          })
      },
      commentChange(html) {
        this.commentContent = html
      },
      uploadComment() {
        // alert(this.commentContent)
        console.log(this.commentUser)
        let comment = {
          name: this.commentUser.name,
          email: this.commentUser.email,
          siteUrl: this.commentUser.siteUrl,
          contentHtml: this.commentContent,
          post: this.post
        }
        commentApi.uploadComment(this.post.id, comment)
          .then(res => {
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '评论成功',
            })
            this.commentContent = ''
            this.getPost()
          })
          .catch(err => {
            this.$log.error(err)
            this.$notify({
              group: 'post',
              title: '评论失败',
            })
          })
      },
      handleReply(replyText) {
        this.commentContent = replyText
        this.$vuetify.goTo('#cmd')
      },
      deleteComment(commentId) {
        if (!confirm("确认删除该留言吗？")) {
          return;
        }
        commentApi.deleteCommentById(commentId)
          .then(res => {
            this.$log.debug(res)
            this.$notify({
              group: 'post',
              title: '删除留言成功'
            })
            this.getPost()
          })
          .catch(err => {
            this.$log.error(err)
            this.$notify({
              group: 'post',
              title: '删除失败',
            })
          })
      }
    },
    metaInfo() {
      return {
        title: this.post.title
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'isLogin',
      }),
      canEdit() {
        if (this.post.user) {
          return this.isLogin
        } else {
          return false
        }
      },
      commentsLength() {
        if (this.post.comments) {
          return this.post.comments.length
        }
        return 0
      }
    },
    components: {
      showPost: ShowPost,
      CommentEditor: CommentEditor,
      ShowComment: ShowComment
    }
  }
</script>

<style scoped>

</style>