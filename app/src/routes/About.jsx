import React from 'react'

// Redux: useSelector
import { useSelector } from "react-redux";

export default () => {

    // Redux: useSelectorでアクセス
    const reduxCount = useSelector((state) => state.postsReducer.count);
    const posts = useSelector((state) => state.postsReducer.posts);

    return (
        <div>
            <h1>About</h1>
            <p>redux count (useSelector): {reduxCount}</p>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}