import React from 'react';
import Header from './Header';
import Searchbar from './Searchbar';
import ListMovies from './ListMovies'
import '../styles/MainPage.css'

class MainPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      movies:[],
      currentSearch:"popular",
      detailId: ''
    }
  }
  changeCurrentSearch=(newSearch)=>{
    this.setState({currentSearch:newSearch}, this.displayMovies);
  }

  componentDidMount(){ 
    this.displayMovies()
  }

  displayMovies(){
    if(this.state.currentSearch==="popular"){
        this.fetchIt("https://api.themoviedb.org/3/movie/popular?api_key=b59ee5e08e11d38120a14b2e670a381d")        }
    else if(this.state.currentSearch==="top"){
        this.fetchIt("https://api.themoviedb.org/3/movie/top_rated?api_key=b59ee5e08e11d38120a14b2e670a381d")
    }
    else if(this.state.currentSearch==="now"){
        this.fetchIt("https://api.themoviedb.org/3/movie/now_playing?api_key=b59ee5e08e11d38120a14b2e670a381d");
    }
    else{
        this.fetchIt('https://api.themoviedb.org/3/search/movie?api_key=b59ee5e08e11d38120a14b2e670a381d&query='+this.state.currentSearch)
    }
  }

  fetchIt(url){
    fetch(url)
      .then((res)=>{
        if(!res.ok){
          return res.json().then((error)=> Promise.reject(error));
        }
        return res.json()
      })
      .then((res)=>{
        this.setState({movies:res.results})
      })
      .catch((error)=>console.log(error));
  }

  setDetailId=(id)=>{
    if(this.state.detailId !== ''){
      this.setState({ detailId: '' })
    }
    else 
      this.setState({ detailId: id })
  }

  render(){
    return (
      <div>
        <Header  />
        <Searchbar changeSearch={this.changeCurrentSearch} />
        <ListMovies movies={this.state.movies} detailId={this.state.detailId} setDetailId={this.setDetailId}/>
      </div>
    )
  }
}

export default MainPage
