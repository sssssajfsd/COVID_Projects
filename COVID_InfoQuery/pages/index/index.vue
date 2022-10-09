<template>
	<view class="content">
		<view class="menu">
				<view class="icon-item" v-for="(item, index) in iconText" :key="index" @click="toPage(index)">
					<view class="icon">
						<img :src="iconList[index]" alt="">
					</view>
					<view class="text">{{item}}</view>
				</view>
		</view>
		<!-- 国内外疫情数据 -->
		<view class="dynamicData">
			<dynamicData></dynamicData>
		</view>
		<!--出行政策查询 -->
		<view class="policyQuery">
			<policyQuery></policyQuery>
		</view>
		<!-- 疫情新闻 -->
		<view class="news">
			<news :newsList = "newsList"></news>
		</view>
	</view>
</template>

<script>
	// import {dynamicData} from '@/wxcomponents/dynamicData/dynamicData.vue'
	// import {policyQuery} from '@/wxcomponents/policyQuery/policyQuery.vue'
	// import {news} from '@/wxcomponents/news/news.vue'
	import {getnewsList} from '@/utils/request.js'
	export default {
		data() {
			return {
				iconText: ["核酸机构", "防疫知识库", "疫情传播链", "核酸物联网"],
				iconList: ["../../static/icon/heSuan.png",
				"../../static/icon/faq.png",
				"../../static/icon/trip.png",
				"../../static/icon/status.png"
				],
				newsList:[],//新闻数据
			}
		},
		onLoad() {
			getnewsList((res)=>{
				if(res.code===200){
					this.newsList = res.newslist[0].news;
				}
			})	
		},
		methods: {
			toPage(id){
				if(id===0){
					// 跳转至外部链接
					uni.navigateTo({
						url: '/pages/nat/nat'
					})
				}
				else if(id===1){
					uni.navigateTo({
						url: "/pages/infoFAQ/infoFAQ",
					});
				}
				else if(id===2){
					uni.navigateTo({
						url: "/pages/tripQuery/tripQuery",
					});
				}
				else if(id === 3){
					uni.navigateTo({
						url: "/pages/aiOt/aiOt",
					});
				}
			},
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		max-width: 1400rpx;
		margin: 0 auto;
	}
	.menu{
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		margin-top: 30rpx;
		padding-bottom: 30rpx;
	}
	.menu .icon-item{
		height: 100rpx;
		width: 100rpx;
		flex: 1;
	}
	.icon-item .icon img{
		width: 80rpx;
		height: 80rpx;
	}
	.icon-item .text{
		font-size: 28rpx;
	}
	.dynamicData,.news,.policyQuery{
		margin-top: 40rpx;
		width: 100%;
	}
	
</style>
