
// import "@/mock/mockServe.js"

const key = "5dc22657a9bfb4b84957333fb7779e2e" //天行数据接口的key

// 请求封装
const get = (url,callback) =>{
	uni.showLoading({
		title:"加载中"
	})
	uni.request({
		url,
		header:{
			'Accept':"application/json",
			"Content-Type":"application/x-www-form-urlencoded",
		},
		method:"GET",
		success:(response)=>{
			const result = response.data
			callback(result)
		},
		complete:(response) =>{
			setTimeout(function(){
				uni.hideLoading();
			},300)
		},
		fail:(error) =>{
			console.log(error);
			uni.hideLoading()
			if(error && error.response){
				showError(error.response)
			}else{
				//....
			}
		}
	})
}
//封装showError 
const showError = error =>{
	let errorMsg = "";
	switch (error.status){
		case 400:
			errorMsg = "请求参数错误"
			break
		case 401:
			errorMsg = "未授权，请登录"
			break
		case 403:
			errorMsg = "跨域拒绝访问"
			break
		case 404:
			errorMsg = `请求地址出错:${error.config.url}`
			break
		case 408:
			errorMsg = "请求超时"
			break
		case 500:
			errorMsg = "服务器错误"
			break
		case 502:
			errorMsg = "网关错误"
			break
		case 503:
			errorMsg = "服务不可用"
			break
		case 504:
			errorMsg = "网关超时"
			break
		case 505:
			errorMsg = "HTTP版本不受支持"
			break
		default:
			errorMsg = error.msg
			break
	}
	
	uni.showToast({
		title:errorMsg,
		icon:"none",
		duration:1000,
		complete:()=>{
			setTimeout(function(){
				uni.hideToast();
			},1000)
		}
	})
}

const BASE_URL = "https://www.yingcloud.com:8000"

export const myRequest = (options) => {
	const header_tmp = {
		"Authorization" : "Bearer" + " " + uni.getStorageInfoSync("Access_token") || ""
	};
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			header: header_tmp,
			success: (res) => {
				if(res.statusCode !== 200 && res.statusCode !== 201){
					return uni.showToast({
						title: "请求失败！"
					})
				};
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					title: "请求接口失败"
				})
				reject(err)
			},
		})
	})
}

export const getnewsList = (callback) => get('https://api.tianapi.com//ncov/index?key='+ key, callback)

export const getTripQuery = (callback) => get("/mock/tripQuery", callback)
export const getPolicyQuery = (key,from,to,callback) => get("/api/springTravel/query?key="+ key+ "&from="+from+"&to="+to, callback)


