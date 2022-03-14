import { Avatar } from "@material-ui/core";
import React from 'react'

function Post({username, caption, imageUrl}) {
  return (
    <div className="Post">
        <div className="post__header">
            <Avatar
                className="post__avatar"
                alt={username}
                src="/static/images/avatar/1.jpg"
            />
            <h3>{username}</h3>
        </div>

        <img className="post__image"
            src={imageUrl}
            alt='post'
        />

        <h4 className="post__caption">
            <strong>{username}</strong>
            {caption}
        </h4>
    </div>
  )
}

export default Post;