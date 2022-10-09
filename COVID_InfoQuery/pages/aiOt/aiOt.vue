<template>
	<view>
		<view class="login" v-show="isAuthorization">
			<view class="uni-common-mt">
				<view class="uni-form-item uni-column">
					<view class="login_label">登录</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="username" focus placeholder="账号" />
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<input class="uni-input" v-model="password" hold-keyboard placeholder="密码" password=true>
					</view>
				</view>
				<view class="uni-form-item uni-column">
					<view>
						<button type="primary" @click="user_login">登录</button>
					</view>
				</view>
			</view>
		</view>
		<view class="message" v-show="!isAuthorization">
			<view class="search" v-if="!cameraShow">
				<uni-nav-bar fixed="false" color="#333333" background-color="#fff" right-icon="scan" @clickRight="scan">
					<view class="input-view">
						<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
						<input confirm-type="search" class="nav-bar-input" v-model="messageSearchQuery" type="text"
							placeholder="输入搜索关键词">
					</view>
				</uni-nav-bar>
			</view>
			<view class="message_item" v-for="(item,index) in filteredDev" :key="index" v-if="!cameraShow">
				<image :src="item.holddeviceimg"></image>
				<view class="right">
					<view class="message_content">
						{{item.holddevice}}
					</view>
					<view class="message_channel">
						<view>
							<text class="device">{{item.message.slice(0,22)}}</text> -<text class="busy"
								v-show="item.datachannel == '拥挤状态'">{{item.datachannel}}</text>
							<text class="empty" v-show="item.datachannel == '空闲状态'">{{item.datachannel}}</text>
							<text class="overbusy" v-show="item.datachannel == '爆满状态'">{{item.datachannel}}</text>
						</view>
						<view class="info">
							<text class="timestamp">{{item.timestamp | formatDate}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="camera" v-if="cameraShow">
				<camera mode="scanCode" device-position="back" flash="off" @error="error" @initdone="scanningCode"
					@scancode="successScan" style="width: 100%; height: 300px;"></camera>
			</view>
		</view>
		<!-- 配置悬浮按钮 -->
		<view>
			<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @trigger="trigger" />
		</view>
	</view>
</template>

<script>
	var padDate = function(va) {
		va = va < 10 ? '0' + va : va;
		return va
	}
	import deviceJson from "@/mock/deviceHolders.json"
	export default {
		data() {
			return {
				isAuthorization: true,
				username: '',
				password: '',
				messages: deviceJson,
				messages2: deviceJson,
				messageSearchQuery: "",
				cameraShow: false,
				dev_id: "",
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#28C76F',
					buttonColor: '#28C76F',
				},
				content: [{
						iconPath: '/static/tabs/map.png',
						selectedIconPath: '/static/tabs/map-active.png',
						text: '空闲',
						active: false
					},
					{
						iconPath: '/static/tabs/toggle-left.png',
						selectedIconPath: '/static/tabs/toggle-left-active.png',
						text: '拥挤',
						active: false
					},
					{
						iconPath: '/static/tabs/message.png',
						selectedIconPath: '/static/tabs/message-active.png',
						text: '爆满',
						active: false
					}
				],
				flag: 0
			}
		},
		computed: {
			filteredDev: {
				get(){
					return this.messages.filter((item) => item.holddevice.toLowerCase().includes(this.messageSearchQuery
					.toLowerCase()) || item.datachannel.toLowerCase().includes(this.messageSearchQuery
					.toLowerCase()));
				}
			}
		},
		onLoad() {
			let access = uni.getStorageSync("Access_token")
			if (access) {
				this.isAuthorization = false
			} else {
				this.isAuthorization = true
			}
		},
		filters: {
			formatDate: function(val) {
				var value = new Date(val);
				//var year=value.getFullYear();
				var month = padDate(value.getMonth() + 1);
				var day = padDate(value.getDate());
				var hour = padDate(value.getHours());
				var minutes = padDate(value.getMinutes());
				//var seconds=padDate(value.getSeconds());
				return month + '-' + day + ' ' + hour + ':' + minutes;
				//return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;

			}
		},
		methods: {
			async user_login() {
				await uni.request({
					url: 'https://www.yingcloud.com:8000/token-api/token/',
					method: 'POST',
					data: {
						'username': this.username,
						'password': this.password
					},
					success: async (res) => {
						console.log(res)
						if (res.statusCode !== 200 && res.statusCode !== 201) {
							return uni.showToast({
								title: "请求失败"
							})
						} else {
							this.isAuthorization = false
							console.log(res.data)
							uni.setStorageSync("Access_token", res.data.access)
						}
					},
					fail: (err) => {
						return uni.showToast({
							title: "请求接口失败"
						})
					},
				})
			},
			async trigger(e) {
				console.log(e)
				for (var i = 0; i < 3; i++) {
					this.content[i].active = false
				}
				this.content[e.index].active = !e.item.active
				if (e.index == 0) {
					console.log('gps');
					this.messages = this.messages2.filter((item) => item.datachannel === "空闲状态");
					this.flag = 1
				} else if (e.index == 1) {
					console.log('switch');
					this.messages = this.messages2.filter((item) => item.datachannel === "拥挤状态");
					this.flag = 2
				} else if (e.index == 2) {
					console.log('text');
					this.messages = this.messages2.filter((item) => item.datachannel === "爆满状态");
					this.flag = 3
				} 
			},
			scan() {
				console.log("binding");
				this.cameraShow = true;
			},
			async scanningCode() {
				var _this = this;
				console.log("start scan");
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						var result = res.result;
						_this.dev_id = result;
					},
				});
				// const response = await this.$myRequest({
				// 	url: '/rest-auth/devholder/',
				// 	method: 'POST',
				// 	data: {
				// 		'dev_owner': 1,
				// 		'binding_dev': this.dev_id
				// 	}
				// });
				this.cameraShow = false

			},
			error() {
				return uni.showToast({
					title: "请设置摄像头使用权限"
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		padding: 20rpx 40rpx;
		margin: 200rpx 20rpx;
		text-align: center;
		background-color: #eee;

		.login_label {
			color: #333333;
			margin: 0 auto;
		}

		.uni-input {
			background-color: #fff;
			height: 80rpx;
			text-align: left;
			padding-left: 10rpx;
			border-radius: 10rpx;
			font-size: 30rpx;
		}

		.uni-form-item {
			margin: 30rpx 0;
		}

		button {
			font-size: 30rpx;
		}
	}

	.message {
		.message_item {
			display: flex;
			padding: 15rpx 20rpx;
			border-bottom: 1px solid #eee;

			image {
				border-radius: 10rpx;
				width: 100rpx;
				min-width: 100rpx;
				max-width: 100rpx;
				height: 90rpx;
			}

			.empty {
				color: green;
				font-weight: bold;
			}

			.busy {
				color: orange;
				font-weight: bold;
			}
			.overbusy{
				color: red;
				font-weight: bold;
			}
			.right {
				margin-left: 15rpx;

				.message_content {
					font-size: 27rpx;
					color: #555555;
					margin-bottom: 10rpx;
				}

				.message_channel {
					display: flex;
					font-size: 25rpx;
					color: #999999;

					.info {
						float: left;
						margin-left: 30rpx;
						font-size: 25rpx;
						color: #999999;

					}

				}
			}
		}
	}

	.search {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		padding: 0;
	}

	.input-view {
		display: flex;
		flex-direction: row;
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-uni-icon {
		line-height: 30px;
	}

	.uni-nav-bar-text {
		font-size: 14px;
	}

	.nav-bar-input {
		display: flex;
		height: 30px;
		line-height: 30px;
		width: 280rpx;
		padding: 0 5px;
		font-size: 14px;
		background-color: #f8f8f8;
	}
</style>
