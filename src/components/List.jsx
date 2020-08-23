import React from 'react'
import ListItem from './ListItem'

function List(props) {
    const listItems=props.lists.map((item,i)=>{
      return  <ListItem key={i} name={item} openList={(name)=>props.openList(name)}/>
    })
    return (
      <ul className="lists-list">
        {listItems} 
      </ul>
    )
}

export default List
