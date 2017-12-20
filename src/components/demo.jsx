import React, { Component } from 'react'
import avatar from '@/assets/Kianna.jpg'
import './demo.css'
export default class demo extends Component {
    render() {
        return (
            <div className="demo">
                <img src={avatar} alt="avatar"/>
                <h3 className="title">一个用来构建react全家桶的webpack模板</h3>
                <p className="exp">
                    建议使用 
                    <a className="AHref"
                        href="https://github.com/alanchenchen/alan-cli"
                        target="blank">alacn-cli</a>
                     来构建，极为方便
                </p>
            </div>
        )
    }
}