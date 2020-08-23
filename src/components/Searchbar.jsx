import React from 'react'

class Searchbar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            input:''
        }
    }
    updateStateWithInput(e){
        this.setState({input:e.target.value});
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.changeSearch(this.state.input);
        this.setState({input:""})
    }
    render(){
        return (
          <div className="searchbar">
            <p onClick={()=>this.props.changeSearch("popular")}>Popular </p> 
            <p onClick={()=>this.props.changeSearch("top")}>Top rated </p> 
            <p onClick={()=>this.props.changeSearch("now")}>Now playing </p> 
            <form onSubmit={(e)=> this.handleSubmit(e)}>
               <input type="text" placeholder="search movie" value={this.state.input} onChange={(e)=>this.updateStateWithInput(e)}/>
               <button type="submit">submit</button>
            </form>
          </div>
         )
    }
}

export default Searchbar
