import React, { Component } from 'react'
import AuthService from '../Services/AuthService';




export default class Home extends Component {
    componentDidMount(){
        AuthService.getUserData('viggu').then(data=>
            console.log(data)
            )
    }
    render() {
        return (
            <div style={{padding:"200px",marginLeft:"400px"}}>
            <h1>TUTR MATCH</h1>
            </div>
        )
    }
}

