<template>
	<view class="content">
		<view class="title">疫情出行政策</view>
		<button class="button"  @click="toPolicy">一键查询出行政策</button>
	</view>
</template>

<script>
	export default {
		name:"policyQuery",
		methods:{
			toPolicy() {
				uni.navigateTo({
					url: "/pages/policyQuery/policyQuery",
				});
			}
		}
	}
</script>

<style scoped>
	.content{
		height: auto;
		padding: 20rpx;
		box-sizing: border-box;
		box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
	}
	.title{
		font-weight: bold;
	}
	.button{
		margin: 20rpx;
		background-color: #007aff;
		border:1rpx solid #007aff;
		color:#fff;
		text-align: center;
		border-radius: 50rpx;
		padding: 10rpx 0;
		font-weight: normal;
	}
</style>