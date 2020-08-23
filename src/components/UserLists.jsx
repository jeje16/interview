import React from 'react';
import Header from "./Header"
import ListMovies from './ListMovies';
import List from './List'
import "../styles/UserLists.css"

class UserLists extends React.Component{
    constructor(props){
        super(props);
        this.state={
            currentList: {},
            movies:[],
            input:'',
            detailId: ''
        }

    }
    handleChange(e){
        this.setState({input:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        this.addList(this.state.input);
        this.setState({input:""})
    }
    getLocalDB(){
      let localDB=JSON.parse(localStorage.getItem("listDB"));
      if(localDB === null){
         return [];
      }
      return localDB;
    }
    addList(listName){
        const newList={ name:listName, movieIds:[] }
        let localDB=this.getLocalDB();
        localDB.push(newList);
        localStorage.setItem("listDB",JSON.stringify(localDB));
    }
    openList(listName){
        let list=""
        let localDB=this.getLocalDB();
        for(let i=0;i<localDB.length; i++){
            if(localDB[i].name===listName){
                list=localDB[i];
                break;
            }
        }
        this.setState({currentList:list, movies: []}, this.showMovies)
    }

    showMovies(){
        if(this.state.currentList !== ""){
            const movieIds = this.state.currentList.movieIds
            for(let i=0; i< movieIds.length; i++){
                this.fetchMovie(movieIds[i])
            }
        }
    }
    fetchMovie(movieId){
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=b59ee5e08e11d38120a14b2e670a381d&language=en-US`)
        .then((res)=>{
            if(!res.ok){
              return res.json().then((error)=> Promise.reject(error));
            }
            return res.json()
          }).then((res)=>{
                let movies = [...this.state.movies, res]
                this.setState({movies: movies})
          }).catch((error)=>console.log(error));
    }

    setDetailId=(id)=>{
        if(this.state.detailId !== ''){
        this.setState({ detailId: '' })
        }
        else 
        this.setState({ detailId: id })
    }
    render(){ 
      const lists=this.getLocalDB().map(item =>item.name)
     
      return (
        <div>
           <Header />
           <form onSubmit={(e)=>this.handleSubmit(e)}>
               <input type="text" value={this.state.input} placeholder="list name"
               onChange={e=>this.handleChange(e)}/>
               <button>Add New list</button>
           </form>
           <div className="list-view">
                <List lists={lists} openList={(name)=>this.openList(name)}/>
                <ListMovies movies={this.state.movies} detailId={this.state.detailId} setDetailId={this.setDetailId} extraClass="movies-view"/> 
            </div>
        </div>
      )  
    }
}

export default UserLists
