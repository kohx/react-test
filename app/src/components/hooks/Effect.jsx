import { axios } from '@/lib/axios/axios';
import React, { useEffect, useState } from 'react'

export default () => {

    const [players, setPlayers] = useState([])

    useEffect(() => {
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then((response) => response.json())
        //     .then((users) => setPlayers(users))

        // const fetchPlayers = async () => {
        //     const response = await fetch(
        //         'https://jsonplaceholder.typicode.com/users'
        //     );
        //     const users = await response.json()
        //     setPlayers(users)
        // }
        // fetchPlayers()

        // (async() => {
        //     const response = await fetch(
        //         'https://jsonplaceholder.typicode.com/users'
        //     );
        //     const users = await response.json()
        //     setPlayers(users)
        // })()

        (async () => {
            const { status, data } = await axios.get('https://jsonplaceholder.typicode.com/users')
            setPlayers(data)
        })()
    }, [])
    
    return (
        <>
            <h2>player list</h2>
            <ul>
                {players && players.map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
        </>
    );
}