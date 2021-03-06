import React from 'react';


export default function BoardItem (props) {
    return (
        <div className="entry-holder">
            <div className="entry-body">
                <img src={props.item.urls.regular} alt={props.item.description}/>
            </div>
            <b>{props.item.description? props.item.description: props.item.user.location}</b><br/>
            <small><a href={`https://unsplash.com/t/experimental`}>{props.item.user.name}</a> on Unsplash</small>
        </div>
    )
}