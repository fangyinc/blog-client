<template>
	<v-card>
		<vm-back-top></vm-back-top>
		<v-card-title>
			<div class="headline mx-auto">归档</div>
		</v-card-title>
		<v-divider></v-divider>
		<v-layout row wrap>
			<v-flex offset-xs1 xs10>
				<v-list>
					<v-list-group
							v-for="(k,i) in archiveList"
							:key="i"
							no-action
					>
						<v-list-tile slot="activator" @click="getPostByTime(k[0], k[1], i)">
							<v-list-tile-content>
								<v-list-tile-title>
									<span>{{k[0]}}年{{k[1]}}月</span>
								</v-list-tile-title>
							</v-list-tile-content>
							<v-list-tile-action>
								<span>({{k[2]}})</span>
							</v-list-tile-action>
						</v-list-tile>
						<v-list-tile
								v-for="subItem in k[3]" :key="subItem.title" @click="handleSubItem(subItem.id)">
							<v-list-tile-content>
								<v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
							</v-list-tile-content>
						</v-list-tile>
					</v-list-group>
				</v-list>
			</v-flex>
		</v-layout>
	</v-card>
</template>

<script>
  import postApi from '../../api/post'

  export default {
    name: "Archive",
    data() {
      return {
        items: [],
        postUrl: '/post/'
      }
    },
    mounted() {
      this.getData()
    },
    computed: {
      archiveList () {
        return this.items.map(p => {
          let arr = []
					arr.push(p[0])
					arr.push(p[1])
					arr.push(p[2])
					arr.push(p[3] || [])
					return arr
				})
      }
    },
    methods: {
      getData() {
        postApi.archive()
          .then(res => {
            this.items = res.data.body
          })
          .catch(err => {
            this.$log.debug(err)
          })
      },
      handleSubItem(postId) {
        this.$router.push({
          path: this.postUrl + postId
        })
      },
      getPostByTime(year, month, index) {
        let date = new Date()
        date.setFullYear(year, month - 1)
        this.$log.debug(date)
        if (this.items[index][3]) {
          return
        }
        postApi.getPostByTime({date: date})
          .then(res => {
            this.$log.debug(res.data)
            this.items[index].push(res.data.body)
          })
          .catch(err => {
            this.$log.debug(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>