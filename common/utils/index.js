export stroe from '../store';

export default {
	gotoLogin: () => {
		return new Promise((resolve, reject) => {
			if (store.state.userInfo.id) {
				resolve(true)
			} else {
				uni.showModal({
					title: '',
					content: '请您先登录',
					success: res => {
						// if (res.confirm) {
						// 	// #ifdef MP-WEIXIN
						// 	uni.navigateTo({
						// 		url: '/pages/login/getUserInfo'
						// 	})
						// 	// #endif
						// 	// #ifndef MP-WEIXIN
						// 	uni.navigateTo({
						// 		url: '/pages/login/index'
						// 	})
						// 	// #endif
						// } else {
						// 	//uni.navigateBack()
						// }
					}
				})
				resolve(false)
			}
		})
	}
}