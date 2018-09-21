import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { hot } from 'react-hot-loader' // react的热替换插件
import RouterView from '@/router/index'

const App = () => {
    return (
        <Router>
            <div>
                <RouterView />
            </div>
        </Router>
    )
}

export default hot(module)(App)