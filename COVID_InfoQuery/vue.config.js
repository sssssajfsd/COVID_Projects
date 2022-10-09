module.exports = {
	devServer:{
		proxy:{
			'/api':{
				target:'http://apis.juhe.cn',
				changeOrigin: true,
				pathRewrite: { '^/api': '' },
				onProxyReq:function(e,req,res){
					console.log("源路径",req.originalUrl)
					console.log("代理路径",req.path)
				}
			},
			'/map':{
				target:'https://vkceyugu.cdn.bspapp.com',
				changeOrigin: true,
				pathRewrite: { '^/map': '' }
			},
			'/g2/getOnsInfo':{
				target:'https://view.inews.qq.com/g2/getOnsInfo',
				changeOrigin: true,
				pathRewrite: { '^/g2/getOnsInfo': '' }
			},
			'/jwsr':{
				target:'https://interface.sina.cn/news/wap/fymap2020_data.d.json',
				changeOrigin: true,
				pathRewrite: { '^/jwsr': '' }
			}
		}
	}
}