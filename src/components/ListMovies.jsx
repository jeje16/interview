import React from 'react';
import Movie from './Movie'
import "../styles/ListMovies.css"
import DetailsMovie from './DetailsMovie';

function ListMovies(props) {
    const movies=props.movies.map((movie,index)=>{
      if(movie.id === props.detailId){
        return <DetailsMovie key={index} data={movie} />
      }
      return <Movie key={index} data={movie} setDetailId={props.setDetailId}/>
    })
    return (
      <ul className={`list ${props.extraClass}`}>
        {movies}
      </ul>
    )
}

export default ListMovies
