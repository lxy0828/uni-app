<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
			<button @click="login" type="primary">我要登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello world',
				phone: 18337166098,
				psw: 123456
			}
		},
		onLoad() {
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const latitude = res.latitude;
			        const longitude = res.longitude;
			        uni.openLocation({
			            latitude: latitude,
			            longitude: longitude,
			            success: function () {
			                console.log('success');
			            }
			        });
			    }
			});
		},
		methods: {
			login () {
				console.log(this.phone, this.psw,this.$store)
				this.$store.dispatch('userLogin', {
					client_id: 1000,
					identity_type: 1,
					identifier: this.phone,
					credential: this.psw
				}).then(res => {
					if (res) {
						console.log(res,333333)
						uni.navigateTo({
						    url: '/pages/second/index'
						});
					} else {
						uni.showModal({
							title: '',
							content: '用户名或密码错误',
							showCancel: false
						})
					}
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
