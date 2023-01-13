import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '@/lib/axios/api'

export default () => {

    // use params
    const params = useParams();

    // get id
    const { postId } = useParams();

    // set post state
    const [post, setPost] = useState({});

    // use effect
    useEffect(() => {

        // cleane
        (async () => {
            const { status, data } = await api.getPost(postId);
            console.log(data);

            setPost(data);
        })()

    }, [postId]);

    return (
        <div>
            <h2>Post {postId}</h2>
            <div>
                <p>ID:{post.id}</p>
                <p>タイトル:{post.title}</p>
                <p>内容:{post.body}</p>
            </div>
        </div>
    )
}