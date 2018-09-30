module.exports = {
    // development
    dev: {
        host: 'localhost', 
        //是否自动获取本机的IPv4地址，因为webpack-dev-server默认不能局域网访问，开启会覆盖host，只在wifi下生效
        useIPv4: false, 
        //如果发现被占用会自动重写
        port: 8080, 
        //是否自动打开浏览器
        autoOpenBrowser: false, 
        //webpack的代理服务器功能，可以实现本地开发跨域请求，原理是运用了http-proxy-middleware中间件
        proxy: {}  
    },
    // production
    prod: { 
        //不管是否开启,css都会生成sourceMap
        sourceMap: false
    },
    // preview file server
    preview: {
        port: 80,
        //静态文件服务器的的根目录
        homePath: 'dist' 
    },   
    CDNLibs:{ 
        //键是你想设置的模块名，值是引入的插件本身暴露在windows下的对象名
        // 'jq':'jQuery'
    }
}