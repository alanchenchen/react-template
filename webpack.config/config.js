//此处设置devServer的ip地址、端口和需要单独打包的第三方库,注意：如果想添加库，必须先install！否则会报错
module.exports = {
    host: 'localhost',
    port:4000,
    autoOpen: false, //是否自动打开页面
    vendors:[
        'react',
        'react-dom',
        // 'react-hot-loader',
        'react-router',
        // 'redux',
        // 'react-redux',
        // 'isomorphic-fetch',
        // 'es6-promise'
    ]
}
