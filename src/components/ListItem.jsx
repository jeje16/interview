import React from 'react';

function ListItem(props) {
    return (
        <li onClick={()=>props.openList(props.name)} className="list_item">
            {props.name}
        </li>
    )
}

export default ListItem
