module.exports = {
    afterInit({
        print,
        configs
    }) {
        const { cliMessage } = configs
        print.warn(
        `
        cd ${cliMessage.name}

        npm install or yarn 安装依赖
        npm start 启动开发环境
        npm run preview 启动预览服务器查看打包后代码
        npm run build 打包代码
        `
        )
    }
}