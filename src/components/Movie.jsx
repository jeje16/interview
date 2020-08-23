import React from 'react'

function Movie(props) {
    return (
        <li className="movie" onClick={()=>props.setDetailId(props.data.id)}>
           <img alt={props.data.title} src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}/> 
        </li>
    )
}

export default Movie
