import React from 'react'
import { Route } from 'react-router-dom'
import routeConfig from './routeConfig'

/**
 * @name RouterView
 * @description 封装的Route组件，搭配配置文件，可以实现跟vue-router一样简单的嵌套路由
 * @param {Object} match (props)  在根路由级别可以不填，但是在子路由下，mathc必须为组件中的props.match
 */
const RouterView = (props) => {
    const match = (props.match && props.match.path) || '/'

    let targetRoutes

    // 根路由和与之同级的所有一级路由
    if(match == '/') {
        targetRoutes = routeConfig.map(root => {
            return {
                path: root.path,
                component: root.component,
                exact: root.exact || false,
                strict: root.strict || false,
                sensitive: root.sensitive || false
            }
        })
    }
    // 根路由下的n级嵌套路由,已对多层嵌套做处理，永远会找到对应层级的children
    else {
        // 通过match切割数据来迭代下潜到指定位置的children
        const ComplexRoute = match.split('/').filter(a => Boolean(a))
        const filterRoute = ComplexRoute.reduce((total, item) => {
            return total.find(a => a.path.endsWith(item)).children
        }, routeConfig)
        
        targetRoutes = filterRoute.map(root => {
            // 对子路由传入的path前缀'/'做兼容处理
            const path = root.path.startsWith('/')
                        ? `${match}${root.path}`
                        : `${match}/${root.path}`
            return {
                path,
                component: root.component,
                exact: root.exact || false,
                strict: root.strict || false,
                sensitive: root.sensitive || false
            }
        })
    }

    // react 16 可以直接在render返回数组或字符串，不需要用一个标签来包裹
    return (
            targetRoutes.map((route, i) => {
                return (
                    <Route 
                        key={`${route.path}-${i}`} 
                        path={route.path}
                        exact={route.exact} 
                        strict={route.strict}
                        sensitive={route.sensitive} 
                        component={route.component} 
                    />
                )
            })
    )
}

export default RouterView