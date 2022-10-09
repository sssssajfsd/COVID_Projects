<template>
	<view class="content">
		<view class="title">
			<span>疫情热点</span>
			<!-- <span>更多<img src="../../static/icon/more.png" alt="">
			</span> -->
		</view>
		<view class="news-item" v-for="(item,index) in newsList" :key="item.id" @click="toDetail(item.sourceUrl)">
			<view class="tag">
				{{item.pubDateStr}}
			</view>
			<view class="news-title">
				{{item.title}}
			</view>
			<view class="summary">
				{{item.summary}}
			</view>
			<view class="sorce">
				{{item.infoSource}}
			</view>
			<!-- <img src="../../static/icon/more.png" alt=""> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"news",
		data() {
			return {
				
			};
		},
		props:{
			newsList:{
				type: Array,
				default: function () {
				return []
			  },
			}
		},
		methods:{
			toDetail(sourceUrl){
				// console.log(sourceUrl);
				uni.navigateTo({
					url:"/pages/newsInfo/newsInfo?sourceUrl="+encodeURIComponent(JSON.stringify(sourceUrl)),
				})
			}
		}
	}
</script>

<style scoped>
	.content{
		height: auto;
	}
	.title{
		position: relative;
		height: 40rpx;
		padding: 20rpx 20rpx;
		line-height: 40rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #e3e3e3;
	}
	
	.title span:first-child{
		font-size: 32rpx;
		font-weight: 700;
	}
	/* .title span:last-child{
		position: absolute;
		right: 30rpx;
		color: #afafaf;
	} */
	.news-item{
		position: relative;
		height: 200rpx;
		line-height: 100rpx;
		/* width: 100%; */
		background-color: #fff;
		padding: 0 20rpx;
		margin-bottom: 10rpx;
		border-bottom: 1px solid #e0e0e0;
	}
	.tag{
		display: inline-block;
		font-size: 28rpx;
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 10rpx;
		color: white;
		margin-right: 20rpx;
		background-color: #F74C31;
	}
	.news-title{
		display: inline-block;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: top;
	}
	.news-item img, .title img{
		width: 30rpx;
		height: 30rpx;
	}
	.news-item img{
		position: absolute;
		right: 30rpx;
		top: 80rpx;
	}
	.sorce{
		float: right;
		height: 80rpx;
		font-size: 24rpx;
		color: #afafaf;
	}
	.summary{
		display: inline-block;
		font-size: 26rpx;
		width: 70%;
		color: #787878;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/*#007aff  */
</style>