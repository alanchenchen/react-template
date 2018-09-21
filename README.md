A react template with webpack for building your react project
## 一款专门适配react开发的webpack模板
### 功能
1. css，less，stylus解析编译，想要使用less或stylus，必须要自己手动npm安装对应的less或stylus。
2. css内图片自动解析并添加hash缓存，字体图标也支持，但在引入阿里的iconfont必须要手动更iconfont.css内的路径为相对路径。
3. jsx和ES6语法解析，自动识别jsx文件，并且支持ES6最新语法，支持stage3语法，例如async函数，也支持类的新属性和静态属性写法。
4. 支持webpack动态导入，配合`import`语法和`react-loadable`实现异步组件。
5. 模板内置了本地服务器devServer，自动启用默认端口为4000服务器，一旦启用开发模式，自动打开index.html。默认提供eval-source-map供调试。
6. 开发模式支持`react-hotloader`热替换，已经在`App.jsx`配置好，代码修改不会重新刷新页面而是局部更改。
7. 生产模式支持提取公共chunks打包，默认将开发代码和第三方库以及webpack运行的runtime文件分离。默认打包压缩混淆并提供source-map供调试。
8. 模板默认设置打包文件所有资源为相对路径，这是为了避免在放到服务器时文件不在根目录导致路径出错的问题。也就是说，打包完后，你可以直接打开index.html访问。

### Directory Tree
```bash
    ─src
    │  ├─assets
    │  ├─components
    │  │  └─Hello
    │  ├─router
    │  └─views
    │      └─Home
    └─webpack.config
```
> 强烈建议按照模板目录来进行开发，可以新增，不要删除

* assets是静态资源，componets是组件，router是路由(已配置好)，views是页面级组件
* 基于react-router-dom，模板对Route组件进行了封装，为了更简单实现多层嵌套路由，模仿vue-router的api
* 模板提供了3个路径符号，@ => src目录， components => src/components目录， views => src/views目录

### 使用
1. git clone https://github.com/alanchenchen/react-template.git 或者使用alan-cli来安装

   **强烈建议使用alan-cli安装，极为便捷，使用方法见[alan-cli](https://github.com/alanchenchen/alan-cli)**  
2. npm install 安装所有开发依赖和打包依赖
3. npm start 或者 npm run dev 启动开发环境，会自动打开index.html
4. npm run build 启动打包程序，默认会在项目根目录生产dist文件夹，index.html在dist根目录，其余静态资源放在static文件夹内

### 开发tips
* SPA单页面应用大部分都是在开发组件和路由，本模板直接在App.jsx中最外层设置了根路由，新增页面只需要在router/routeConfig中添加路由参数即可
* 模板中二次封装的路由组件为`RouterView`，该组件和`react-router-dom`原生组件不会冲突，如果你想快速配置嵌套路由，建议使用`RouterView`和配置文件，你也可以单独使用`react-router-dom`的`Route`组件
* `RouterView`组件模仿vue-router的配置，routeConfig.jsx中的配置格式如下:
```javascript
    export default [
        {
            path: '/',
            exact: true,        // Route组件原生的props
            strict: false,      // Route组件原生的props
            sensitive: true,    // Route组件原生的props
            component: Home
        }
        {
            path: '/sub',       // 和'/'在同一级的均为根级路由，根级路由也是一层路由，在使用RouterView组件时，不需要传入match的props
            component: Sub,
            children: [         // 嵌套路由只需要在当前父级路由下新增children选项，在使用RouterView组件时，必须传入match的props
                {
                    path: 'hello', // 嵌套路由可以加'/'前缀或者不加，已做兼容处理
                    component: Hello
                },
                {
                    path: '/world',
                    component: World,
                    children: [   // RouterView组件支持多级嵌套，会自动找寻对应层级的路由参数
                        {
                            path: 'a',
                            component: () => {
                                return <h3>this is world A</h3>
                            }
                        },
                        {
                            path: 'b',
                            component: () => {
                                return <h3>this is world B</h3>
                            }
                        }
                    ]
                }
            ]
        }
    ]

```

### 注意事项
* 模板支持less和stylus，但是必须要自己安装less或者stylus才有效，如果像使用sass，请自己在webpack.base.js内添加sass-loader.
* 模板支持手动修改devServer端口，默认4000，可以在webpack.config文件夹下的config.js里修改
* 模板支持手动添加第三方库打包
