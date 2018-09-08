import React, { Component } from 'react'
import "./searchBox.css"
import { Input } from 'element-react';


export default class SearchBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            keyword: ""
        };
        this.getKeyword = e => {
            this.setState({
              keyword: e
            })
        };
        this.onKeyup = e => {
            e.keyCode === 13 && this.props.search(this.state.keyword)
        }
    }
    render(){
        return (
            <div className="search_box">
                <Input placeholder="search..." onKeyUp={this.onKeyup} onChange={this.getKeyword}></Input>
            </div>
        ) 
    }
}