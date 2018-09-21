import React, { Component } from 'react'
import Hello from 'components/Hello/index'

export default class Home extends Component {
    state = {
        title: 'Welcome to React'
    }
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center',margin: '100px 0 10px'}}>{this.state.title}</h1>
                <Hello />
            </div>
        )
    }
}