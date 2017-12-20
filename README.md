A react template with webpack for building your react project
## 一款专门适配react开发的webpack模板
### 功能
1. css，less，stylus解析编译，加入postcss自动添加css后缀，想要使用less或stylus，必须要自己手动npm安装对应的less或stylus。
2. jsx和ES6语法解析，自动识别jsx文件，并且支持ES6最新语法，注意，并没有支持runtime和polyfill，也就是说ES6之后新增的部分特性不支持，例如：async和generator。pormise本身是支持的。
3. css内图片和html图片均自动解析并添加hash缓存，字体图标也支持，但在引入阿里的iconfont必须要手动更iconfont.css内的路径为相对路径。
4. 模板内置了本地服务器devServer，自动启用默认端口为8080服务器，一旦启用开发模式，自动打开index.html。默认提供eval-source-map供调试。
5. 模板支持开发模式中命令行报错美化，跟vue-cli的webpack模板一致。
6. 生产模式支持提取公共chunks打包，默认将开发代码和第三方库以及webpack运行的runtime文件分离。默认打包压缩混淆并提供source-map供调试。
7. 模板默认设置打包文件所有资源为相对路径，这是为了避免在放到服务器时文件不在根目录导致路径出错的问题。也就是说，打包完后，你可以直接打开index.html访问。

### 使用
1. git clone https://github.com/alanchenchen/react-template.git 或者使用alan-cli来安装

   **强烈建议使用alan-cli安装，极为便捷，使用方法见[alan-cli](https://github.com/alanchenchen/alan-cli)**  
2. npm install 安装所有开发依赖和打包依赖
3. npm start 或者 npm run dev 启动开发环境，会自动打开index.html
4. npm run build 启动打包程序，默认会在项目根目录生产dist文件夹，index.html在dist根目录，其余静态资源放在static文件夹内

### 注意事项
* 模板支持less和stylus，但是必须要自己安装less或者stylus才有效，如果像使用sass，请自己在webpack.base.js内添加sass-loader.
* 模板支持手动修改devServer端口，默认4000，可以在webpack.config文件夹下的config.js里修改
* 模板支持手动添加第三方库打包，默认打包了react、react-dom、react-router，使用方法见config.js。如果想添加，必须要保证安装了对应的库，否则会报错！
