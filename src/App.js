import React, { Component } from 'react';
import './App.css';
import SearchBox from "./components/SearchBox/searchBox"
import ListBox from "./components/ListBox/listBox"
import 'element-theme-default';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Message,Button } from "element-react"

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultList: [],
      keyword: '',
      pageSize: 14,
      pageNum: 1,
      loadBool: false
    },
    this.search = keyword => {
      if(!keyword||this.state.loadBool) return
      if(keyword!=this.state.keyword){
        this.setState({
          pageNum: 1,
          resultList: []
        })
      }
      this.setState({
        keyword: keyword,
        loadBool: true
      })
      let url = `https://api.github.com/search/repositories?q=${keyword}&sort=stars&order=desc&page=${this.state.pageNum}&per_page=${this.state.pageSize}`;
      fetch(url).then(response => {
        return response.json();
      }).then(json => {
        if(json.items){
          this.setState({
            resultList: this.state.resultList.concat(json.items),
            loadBool: false
          })
        }else{
          this.setState({
            loadBool: false
          })
          this.openErr()
        }        
      })
    },
    this.openErr = ()=> {
      Message.error('你的请求太热情了，GitHub表示拒绝');
    },
    this.scrollToTop = ()=> {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    }
    //上拉加载
    this.loadMore = ()=>{
      this.setState({
        pageNum: this.state.pageNum++
      })
      this.search(this.state.keyword)
    }
  }
  render() {
    return (
      <div className="App">
        <SearchBox search={this.search.bind(this)} />
        {this.state.resultList.length?<InfiniteScroll
            dataLength={this.state.resultList.length}
            next={this.loadMore}
            hasMore={true}
            loader={this.state.loadBool?<h4 className="load">Loading...</h4>:""}>
            <ListBox resultList={this.state.resultList} />
          </InfiniteScroll>:
          <div className="list_default">
            <div className="logo" className={this.state.loadBool?"logo logo_anim":"logo"}></div>
            <div className="motto">It is the time you have wasted for your rose that makes your rose so important.</div>
          </div> 
        }
        {this.state.resultList.length?<button className="to_top" onClick={this.scrollToTop}></button>:""}
      </div>
    );
  }
}

export default App;
