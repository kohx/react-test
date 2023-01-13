import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import api from '@/lib/axios/api'
import { Link } from 'react-router-dom'

export default () => {

    const location = useLocation()
    const isDetailPage = location.pathname != '/posts'
    console.log(isDetailPage);
    

    const maxPage = 10

    // set post list state
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    // if type 1
    const Message = () => {
        if (!loading && posts.length == 0) {
            return <div>not found posts!</div>
        } else {
            return null
        }
    }

    const prev = async () => {

        const afterPage = page - 1

        if (afterPage < 1) {
            return
        }

        setPage(afterPage)

        setloading(true)
        const { status, data } = await api.getPosts(afterPage)
        setloading(false)

        setPosts(data)
    }

    const next = async () => {
        const afterPage = page + 1

        if (afterPage > maxPage) {
            return
        }

        setPage(afterPage)

        setloading(true)
        const { status, data } = await api.getPosts(afterPage)
        setloading(false)

        setPosts(data)
    }

    const [loading, setloading] = useState(false)

    useEffect(() => {

        (async () => {
            setloading(true)
            const { status, data } = await api.getPosts()
            setloading(false)

            setPosts(data)
        })()

    }, [])

    return (
        <div>
            <h1>Posts</h1>

            <Outlet />

            {isDetailPage ||

                <div>
                    <Message />

                    {loading &&
                        <div>loading...</div>
                    }

                    {loading ||
                        <div>loaded!</div>
                    }

                    {loading
                        ? <div>loading...</div>
                        : <div>loaded!</div>
                    }

                    {posts.length > 0 &&
                        <ul>
                            {posts.map((post) =>
                                <li key={post.id}>
                                    <Link
                                        to={`${post.id}`}
                                    // to={`/posts/${post.id}`}
                                    >
                                        {post.id}: {post.title}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    }

                    <button onClick={() => prev()}>prev</button>
                    <span>{page}</span>
                    <button onClick={() => next()}>next</button>
                </div>
            }
        </div >
    )
}