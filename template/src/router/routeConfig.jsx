import React from 'react'
import Loadable from 'react-loadable'
// react-loadable ==> react-router官网推荐的插件  https://github.com/jamiebuilds/react-loadable


// 异步路由组件，按需加载，不会全部打包进app的bundle
// const Home = Loadable({
//     loader: () => import(/* webpackChunkName: "Hello_React_Template" */ 'views/Home/index'),
//     loading: () => {
//         return <div>loading...</div>
//     }
// })

// 同步路由组件，会一次性打包进app的bundle
import Home from 'views/Home/index'

export default [
    {
        path: '/',
        exact: true,
        component: Home
    }
]