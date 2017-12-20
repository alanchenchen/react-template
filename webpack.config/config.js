//此处设置devServer的端口和需要单独打包的第三方库,注意：如果想添加库，必须先install！否则会报错
module.exports = {
    port:4000,
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