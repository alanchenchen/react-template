const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成一个html，自动嵌入打包后的js和css
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ROOTPATH = process.cwd() //获取进程的根绝对路径
const env = process.env.NODE_ENV //获取进程的模式是开发环境还是生产环境
const isProduction = env == 'production'

const CDNLibs = require('./config').CDNLibs

module.exports = {
	entry: {
		app: path.join(ROOTPATH, 'src/main.js')
	},
	output: {
		filename: 'static/js/[name].js',
		path: isProduction ? path.join(ROOTPATH, 'dist') : ROOTPATH, //打包输出的目录
		publicPath: isProduction ? './' : '/' //打包输出的html引用打包后文件夹的路径
	},
	module: {
		rules: [
			{
				test: /\.(png|gif|jpg|svg|jpeg)$/i, //打包css里图片
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[hash].[ext]',
							outputPath: 'static/img/' //图片文件打包后存放的路径
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,//打包css里字体
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							name: '[name].[hash].[ext]',
							outputPath: 'static/fonts/' //字体文件打包后存放的路径
						}
					}
				]
			},
			{
				test: /\.(js|jsx)$/i, //打包js或jsx，转码ES6+
				exclude: /(node_modules|bower_components)/,
				include: path.join(ROOTPATH, 'src'),
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'stage-3', 'react'],
						plugins: ['react-hot-loader/babel', 'transform-class-properties']
					}
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(ROOTPATH, 'index.html'),
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			// necessary to consistently work with multiple chunks via CommonsChunkPlugin
			chunksSortMode: 'dependency'
		}),
		new CopyWebpackPlugin([
			{ 
				from: path.resolve(ROOTPATH, 'static'),
				to: path.resolve(ROOTPATH, 'dist/static'),
				ignore: ['.*']
			}
		])
	],
	resolve: {
		alias: {
			'@': path.resolve(ROOTPATH, 'src'),
			'components': path.resolve(ROOTPATH, 'src/components'),
			'views': path.resolve(ROOTPATH, 'src/views'),
			'static': path.resolve(ROOTPATH, 'static')
		},
		extensions: ['.js', '.jsx', '.json', '.css', '.less', '.styl']
	},
	externals: CDNLibs
}
