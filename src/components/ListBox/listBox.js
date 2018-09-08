import React from 'react'
import {Tag} from 'element-react'
import "./listBox.css"
import STAR from '../../assets/images/star.svg';

export default class ListBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            resultList: this.props.resultList
        }
    }
    render(){
        return (
            <div className="list_box">
                <ul>
                    {this.props.resultList.map((item,index)=>{
                        return <li key={index} className={index==this.props.resultList.length-1?"last_item":""}>
                            <div className="item_header">
                                <img src={item.owner.avatar_url}></img>
                                <span>{item.owner.login}</span>
                            </div>
                            <div className="item_content">
                                <h3 className="name"><a href={item.html_url||''}>{item.full_name}</a></h3>
                                <div className="description">{item.description}</div>
                            </div>
                            <div className="item_footer">
                                {item.language?<Tag type="primary" >{item.language}</Tag>:<span></span>}
                                <div className="star_num">
                                    <img src={STAR}></img>
                                    <span>{item.stargazers_count||""}</span>
                                </div>
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        ) 
    }
} 