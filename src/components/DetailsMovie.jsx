import React from 'react'

function DetailsMovie(props) {
    function getLocalDB(){
        let localDB=JSON.parse(localStorage.getItem("listDB"));
        if(localDB === null){
            return [];
        }
        return localDB;
    }
    function handleSubmit(e){
        e.preventDefault();
        const listIndex=document.getElementById("list").value;
        let localDB=getLocalDB();
        localDB[listIndex].movieIds.push(props.data.id);
        localStorage.setItem("listDB",JSON.stringify(localDB));
        console.log(getLocalDB())
    }

    const lists=getLocalDB().map(item =>item.name);
    const listOptions=lists.map((name,i)=>{
        return <option key={i} value={i}>{name}</option>
    })

    return (
        <li className="movie-detail" >
           <img className="detail-img" alt={props.data.title} src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}/>
           <div className="right_side">
                <h1>Title: {props.data.title}</h1>
                <h1>Overview: {props.data.overview}</h1>
                <h1>Release date: {props.data.release_date}</h1>
                <form onSubmit={(e)=>handleSubmit(e)} >
                    <label htmlFor="list">Add to list: </label>
                    <select id="list">
                        {listOptions} 
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div> 
        </li>
    )
}

export default DetailsMovie
