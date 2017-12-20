const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')//清除打包后的重复chunk
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')//报错友好提示插件
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成一个html，自动嵌入打包后的js和css
const ROOTPATH = process.cwd()
const env = process.env.NODE_ENV //获取进程的模式是开发环境还是生产环境
const isProduct = env == 'production'
const vendors = require('./config').vendors
const ExtractTextPlugin = require('extract-text-webpack-plugin')//提取独立文件
const extractCSS = new ExtractTextPlugin('static/style/[name]-css.css')
const extractLESS = new ExtractTextPlugin('static/style/[name]-less.css')
const extractSTYLUS = new ExtractTextPlugin('static/style/[name]-stylus.css')

module.exports = {
	devtool: isProduct ? 'source-map' : 'eval-source-map',
	entry:{
		app:path.join(ROOTPATH, 'src/main.js'),
		vendor:vendors//单入口必须在entry加入第三方类库，否则提取公共chunk为空
	},
	output: {
		filename: 'static/js/[name].js',
		path: path.join(ROOTPATH, 'dist'),//打包输出的目录
		publicPath: isProduct ? '../dist/' : '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.(htm|html)$/i,//打包html内src的图片
				use: ['html-withimg-loader']
			},
			{
				test: /\.(png|gif|jpg|svg|jpeg|woff|woff2|eot|ttf|otf)$/i,//打包css里图片和字体
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name]-[hash:6].[ext]',
							outputPath: 'static/img/',
						}
					}
				]
			},
			{
				test: /\.js$/,//打包js，转码ES6
				exclude: /(node_modules|bower_components)/,
				include: path.join(ROOTPATH, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'env'],
						plugins: ["react-hot-loader/babel"]
					}
				}
			},
			{
				test: /\.jsx$/i,//转码jsx
				exclude: /(node_modules|bower_components)/,
				include: path.join(ROOTPATH, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'react', 'env'],
						plugins: ["react-hot-loader/babel"]
					}
				}
			},
			{
				test: /\.css$/,//打包css
				use: isProduct ?
					extractCSS.extract({
						publicPath: '../../',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: true
								}
							},
							'postcss-loader']
					})
					: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.less$/,//打包less
				use: isProduct ?
					extractLESS.extract({
						publicPath: '../../',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: true
								}
							},
							'less-loader']
					})
					: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.styl$/,//打包stylus
				use:isProduct ?
					extractSTYLUS.extract({
						publicPath: '../../',
						use: [
							{
								loader: 'css-loader',
								options: {
									minimize: true
								}
							},
							'stylus-loader']
					})
					: ['style-loader', 'css-loader', 'stylus-loader']
			}
		]
	},
	plugins: isProduct ? [
		extractCSS,
		extractLESS,
		extractSTYLUS,
		new CleanWebpackPlugin('dist', { root: ROOTPATH }),//每次启动都会清除dist目录...
		new HtmlWebpackPlugin({
			template:  path.join(ROOTPATH, 'src/index.html'),
			inject: true,
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:['vendor','manifest'],//vendor是为了提取第三方库到缓存，mainfest是为了避免内容改变hash改变
			filename:'static/js/[name].[chunkhash].js',
			minChunks:Infinity
		})
	]
		: [
			new CleanWebpackPlugin('dist', { root: ROOTPATH }),//每次启动都会清除dist目录...
			new FriendlyErrorsWebpackPlugin(),
			new HtmlWebpackPlugin({
				template:  path.join(ROOTPATH, 'src/index.html'),
				inject: true
			})
		],
	resolve: {
		alias: {
			'@': path.resolve(ROOTPATH, 'src')
		},
		extensions: [".js", ".jsx"]
	}
}
