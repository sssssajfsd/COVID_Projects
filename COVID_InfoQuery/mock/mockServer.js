//导入mockjs 和 json 数据
import Mock from 'mockjs'
import article from './article.json'

//配置mock规则
Mock.mock('http://covid.com/mock/article', {code: 200, data: article})