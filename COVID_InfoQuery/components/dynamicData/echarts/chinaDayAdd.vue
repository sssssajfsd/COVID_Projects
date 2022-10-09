<template>
  <view class="charts-box">
    <qiun-data-charts 
      type="line"
      :opts="opts"
      :chartData="chartData"
    />
  </view>
</template>

<script>
export default {
	props: {
		categories: {
			type: Array,
			default: function () {
				return [];
			},
		},
		series: {
			type: Array,
			default: function () {
				return [];
			},
		},
	},
  data() {
    return {
      chartData: {},
	  opts: {
        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
        padding: [15,10,0,15],
		dataLabel: false,//不显示顶部数据
		dataPointShape: false,
        legend: {
			show: true,
			position: "top",
			float: "left",
			borderRadius: 50
		},
        xAxis: {
			rotateLabel: true,
			rotateAngle: 58,
			labelCount: 7,
			disableGrid: true,
			boundaryGap: "center",
        },
        yAxis: {
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "curve",
            width: 2
          }
        }
      }
    };
  },
  mounted() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
		
        let res = {
            categories: this.categories,
            series: this.series
          };
		  
		  // console.log( this.categories);
		  // console.log( this.series);
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  }
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>