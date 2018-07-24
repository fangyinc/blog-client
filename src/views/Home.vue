<template>
  <v-layout row>
    <v-flex md7 sm12 offset-md1>
      <router-view  v-transition></router-view>
    </v-flex>
    <v-flex offset-md1 md2 v-bind:class="{'hidden-sm-and-down': true}">
      <right-side></right-side>
    </v-flex>
  </v-layout>
</template>

<script>
	import RightSide from '../components/RightSide'
	export default {
		name: "Home",
		data() {
			return{
			}
		},
		components: {
			rightSide: RightSide
		}
	}
</script>

<style scoped lang="stylus">
  /*@import '~vuetify/src/stylus/main'*/
</style>