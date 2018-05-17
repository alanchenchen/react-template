const merge = require('webpack-merge')
const common = require('./webpack.base.js')
const host = require('./config').host
const port = require('./config').port
const autoOpen = require('./config').autoOpen

module.exports = merge(common, {
	devServer: {
		contentBase: process.cwd(),//当前是以项目根目录作为本地服务器根目录
		host,
		port,
		hot: true,
		inline: true,
		open: autoOpen,
		openPage: 'dist/index.html',
		historyApiFallback: true,
		quiet: true, //ErrorFriendly插件要求，开发环境出错不会出现打包信息
		noInfo: true,//不显示打包的信息
		overlay: {//全屏显示错误和警告
			warnings: true,
			errors: true
		}
	}
})
