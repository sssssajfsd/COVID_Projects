//从mockjs中引入Mock
import Mock from "mockjs"
// 引入模拟的json数据，是一个对象，包含nodes和links两部分
import tripQuryDatas from "./tripQuery.json"

Mock.setup({
	timeout: "300-600"
})

//mock第一个参数：请求地址   第二个参数：请求数据
Mock.mock("/mock/tripQuery", {code: 200, data: tripQuryDatas});