import React from "react";
import Post from "./Post"

function PostList(props) {
    if (!props.posts) {
        return <h2>Loading data...</h2>
    }
    return (
        props.posts.map(post => 
            <Post 
            key={post.id}
            post={post}
            />
        )
    )
}

export default PostList;