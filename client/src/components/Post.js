import React from "react";

function Post(props) {
    return (
        <div>
            {props.post.text}
        </div>
    )
}

export default Post;