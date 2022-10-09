<template>
	<view class="content">
		<view class="charts-box" style="height: 400px;">
			<qiun-data-charts type="map" :opts="opts" canvasId="mapma" :chartData="chartsDataMap"
				tooltipFormat="tooltipFun"  />
				<!-- @getIndex="getIndex" -->
		</view>
	</view>
</template>

<script>
	import mapdata from '@/static/mapdata.json'
	import uCharts from '@/uni_modules/qiun-data-charts/js_sdk/u-charts/config-ucharts.js' //在uniapp 插件库下载下来就是这个路径 可以自己改
	export default {
		created(){
			
		},
		props: {
			allCitys: {
				type: Array,
				default: function () {
					return [];
				},
			},
		},
		data() {
			return {
				//地图数据
				chartsDataMap: {
					series: []
				},opts: {
					timing: "easeOut",
					duration: 1000,
					rotate: false,
					rotateLock: false,
					color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
					padding: [0,0,0,0],
					fontSize: 10,
					fontColor: "#666666",
					dataLabel: true,
					dataPointShape: true,
					dataPointShapeType: "solid",
					touchMoveLimit: 60,
					enableScroll: false,
					enableMarkLine: false,
					extra: {
					  map: {
						border: true,
						borderWidth: 1,
						borderColor: "#666666",
						fillOpacity: 0.6,
						activeBorderColor: "#F04864",
						activeFillColor: "#FACC14",
						activeFillOpacity: 1,
						mercator: true
					  },
					  tooltip: {
						showBox: true,
						showArrow: true,
						showCategory: false,
						borderWidth: 0,
						borderRadius: 0,
						borderColor: "#000000",
						borderOpacity: 0.7,
						bgColor: "#000000",
						bgOpacity: 0.7,
						gridType: "solid",
						dashLength: 4,
						gridColor: "#CCCCCC",
						fontColor: "#FFFFFF",
						splitLine: true,
						horizentalLine: false,
						xAxisLabel: false,
						yAxisLabel: false,
						labelBgColor: "#FFFFFF",
						labelBgOpacity: 0.7,
						labelFontColor: "#666666"
					  }
					}
				  }
			};
		},
		mounted() {
			 this.getServerData();
			 
			//自定义格式化Tooltip显示内容  
			uCharts.formatter.tooltipFun = (item, category, index, opts) => {
				return  `${item.name}地区确诊：${item.data.value}`
			}
		},
		methods: {
			getServerData() {
				setTimeout(() => {
					// console.log(777);
					// console.log(JSON.parse(JSON.stringify(this.allCitys)));
					let temp = Object.assign([],this.allCitys).map(item => {
					  return Object.assign({},item)
					})
					let data = Object.assign([],this.allCitys).map(item => {
					  return Object.assign({},item)
					})
						// console.log(data);
					let mapseries = mapdata.features.map((item) => {
						//根据接口数据查找到当前匹配的数据
						// console.log(data.find((x) => x.name.substring(0,2) == item.properties.name || x.name.substring(0,3) == item.properties.name));
						let dataItem = data.find((x) => x.name.substring(0,2) == item.properties.name || x.name.substring(0,3) == item.properties.name)||{
							name: item.properties.name, //地区
							value: 0, //确诊人数
						}
						//添加到 json data中
						item.data = dataItem
						// console.log(dataItem);
						// console.log(item.data);
						//设置颜色
						item.color = this.addColor(dataItem.value)
						return item
					})
					// console.log(mapseries);
					setTimeout(()=>{
						this.chartsDataMap.series = mapseries;
					// console.log(this.chartsDataMap.series);
					},1000)
				}, 500);
			},
			// 根据条件添加颜色
			addColor(count) {
				// console.log(66);
				if (count >= 10000) {
					return '#910606';
				} else if (count > 1000) {
					return '#c1393c';
				} else if (count > 100) {
					return '#F57567';
				} else if (count > 10) {
					return '#FF9985';
				} else if (count > 0) {
					return '#FFE5DB';
				} else {
					return '#FFFFFF';
				}
			},
			//鼠标点击地图 会触发该事件
			// getIndex(e) { // 点击地图进行操作
			// 	console.log(e, "===uCharts====")
			// }
		}
	};
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.charts-box {
		width: 100%;
		margin-left: 20px;
	}
</style>