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
        this.fetchIt("https://api.themoviedb.org/3/discover/movie?api_key=b59ee5e08e11d38120a14b2e670a381d&/discover/movie?sort_by=popularity.desc")        }
    else if(this.state.currentSearch==="top"){
        this.fetchIt("https://api.themoviedb.org/3/discover/movie?api_key=b59ee5e08e11d38120a14b2e670a381d&certification_country=US&sort_by=vote_average.desc")
    }
    else if(this.state.currentSearch==="now"){
        this.fetchIt("https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2020-08-15&primary_release_date.lte=2020-09-22&api_key=b59ee5e08e11d38120a14b2e670a381d");
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
