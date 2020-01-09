<template>
	<view>
		<text>hello</text>
		<text>{{userInfo || '342334'}}</text>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed: {
			...mapState([
				'userInfo'
			])
		}
	}
</script>

<style>

</style>
