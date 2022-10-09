<template>
	<view class="info-container">
		<!-- 头部导航栏 -->
		<view class="info-bar">
			<text v-for="(item, index) in navList" :key="index" @click="changeActive(item)"
				:class="{ active: item.id === current}">{{item.title}}</text>
		</view>
		<!-- 滚动区域 -->
		<scroll-view class="scroll" scroll-y="true" :scroll-into-view="id" scroll-with-animation @scroll="scroll($event)">
			<view v-for="(item, index) in data" :id="item.id" :key="index" class="text">
				<view class="image" v-if="item.id === 'a'">
					<image style="width: 100%;border-radius: 10rpx;" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-acb7ba46-bcc3-4d15-b4a2-0fa52cccd59a/74bc0eaa-b6b1-4f8d-b6f2-ecb75e720d89.png" mode="aspectFill"></image>
				</view>
				<view class="section" v-for="(article, index) in item.article" :key="index">
					<view class="h2">{{article.title}}</view>
						<view class="p" v-for="(content, index) in article.paragraph" :key="index">{{content.content}}</view>
						<view class="smallsection" v-if="article.smalltitle" v-for="(smalltitle, index) in article.smalltitle" :key="index">
							<view class="h4">{{smalltitle.title}}</view>
							<view class="p" v-for="(contents, index) in smalltitle.paragraph" :key="index">{{contents.content}}</view>
						</view>
					</view>
				</view>
		</scroll-view>
	</view>
</template>

<script>
	import data from '../../mock/article.json'
	export default {
		data() {
			return {
				navList: [{
						id: 'a',
						title: '概述'
					},
					{
						id: 'b',
						title: '症状'
					},
					{
						id: 'c',
						title: '预防'
					},
				],
				id: 'a',
				current : 'a',
				scrolltopb: 0,
				scrolltopc: 0,
				data: data
			}
		},
	    created() {
			// 发请求得到防疫知识数据
			//mock拿不到数据，暂时先不发请求
				let that = this
				uni.request({
					url:'http://covid.com/mock/article',
					method:'GET',
					success(res) {
						console.log(res);
						// that.data = res.data
					}
				})
		},
		onReady() {
			//初始化标志，为实现滚动时导航栏联动功能
			setTimeout(() => {
				uni.createSelectorQuery().select('#b').boundingClientRect((data) => {
					this.scrolltopb = data.top - 46
				}).exec()
				uni.createSelectorQuery().select('#c').boundingClientRect((data) => {
					this.scrolltopc = data.top - 46
				}).exec()
			}, 0) //定时器保证在获取数据并且页面渲染完成后再获取元素的属性， 如果发请求改为1000ms
			
		},
		methods: {
			//点击导航栏滚动到指定位置
			changeActive(item) {
				this.id = item.id
			},
			//实现滚动时导航栏联动功能
			scroll(e) {
				if (e.detail.scrollTop < this.scrolltopb) {
					this.current = 'a'
				} else if (e.detail.scrollTop < this.scrolltopc) {
					this.current = 'b'
				} else {
					this.current = 'c'
				}
				
			}
		}
	}
</script>
<style lang="less">
	.info-container {
		padding: 10rpx;
		.info-bar {
			position: sticky;
			max-width: 750px;
			border-radius: 5rpx;
			margin: auto;
			top: 0px;
			/* #ifdef H5 */
			top: 44px;
			/* #endif */
			background-color: #0082c3;
			color: #fff;
			display: flex;
			justify-content: space-around;

			text {
				height: 80rpx;
				font-size: 18px;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;

			}

			.active {
				color: black;
				background-color: #fff;
			}
		}

		.scroll {
			max-width: 750px;
			height: 88vh;
			margin: auto;

			.text {
				background-color: #ddd;
				padding: 10rpx 20rpx;
				.section {
					background-color: #fff;
					padding: 5rpx 30rpx;
					margin: 15rpx 0;
					border-radius: 20rpx;
				}
				.h2 {
					font-size: 50rpx;
					font-weight: 900;
					padding: 20rpx 0;
					border-bottom: 2px solid #ccc;
				}

				.h4 {
					font-size: 35rpx;
					font-weight: 700;
				}
				.p {
					padding: 10rpx;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
