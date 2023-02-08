import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, createElement } from 'react'
import { generatePath } from 'react-router-dom'

const createCards = () => {
    let cards = []
    let count = 1
    const templates = [{ code: 0, mark: '♦', color: 'red' }, { code: 1, mark: '♠', color: 'black' }, { code: 3, mark: '♥', color: 'red' }, { code: 3, mark: '♣', color: 'black' }]
    templates.forEach(card => {
        for (let index = 1; index <= 3; index++) {
            cards.push({ id: count, number: index, ...card })
            count++
        }
    })
    return cards
}

const shuffle = (cards) => {
    const ids = cards.map(value => value.id)
    for (let i = ids.length; 1 < i; i--) {
        const k = Math.floor(Math.random() * i);
        [ids[k], ids[i - 1]] = [ids[i - 1], ids[k]];
    }
    return ids
}

const cards = createCards()

const Card = ({ id }) => {

    if (!id) return

    const card = cards.find(card => card.id === id)

    return (
        // <div style={{ color: `${card.color}` }}>[{card.id}] {card.mark}: {card.number} </div>
        <div>{card.id}</div>
    )
}

export default () => {

    const [stock, setStock] = useState(shuffle(cards))

    const [draw, setDraw] = useState()

    const [deck0, setDeck0] = useState({ code: 0, mark: '♦', ids: [], elm: useRef(null) })
    const [deck1, setDeck1] = useState({ code: 1, mark: '♠', ids: [], elm: useRef(null) })
    const [deck2, setDeck2] = useState({ code: 2, mark: '♥', ids: [], elm: useRef(null) })
    const [deck3, setDeck3] = useState({ code: 3, mark: '♣', ids: [], elm: useRef(null) })


    const decks = {
        deck0: { deck: deck0, setTable: setDeck0 },
        deck1: { deck: deck1, setTable: setDeck1 },
        deck2: { deck: deck2, setTable: setDeck2 },
        deck3: { deck: deck3, setTable: setDeck3 },
    }

    const [table0, setTable0] = useState({ slot: 1, open: 0, ids: [], elm: useRef(null) })
    const [table1, setTable1] = useState({ slot: 2, open: 0, ids: [], elm: useRef(null) })
    const [table2, setTable2] = useState({ slot: 3, open: 0, ids: [], elm: useRef(null) })
    const [table3, setTable3] = useState({ slot: 4, open: 0, ids: [], elm: useRef(null) })
    const [table4, setTable4] = useState({ slot: 5, open: 0, ids: [], elm: useRef(null) })
    const [table5, setTable5] = useState({ slot: 6, open: 0, ids: [], elm: useRef(null) })
    const [table6, setTable6] = useState({ slot: 7, open: 0, ids: [], elm: useRef(null) })

    const tables = {
        table0: { table: table0, setTable: setTable0 },
        table1: { table: table1, setTable: setTable1 },
        table2: { table: table2, setTable: setTable2 },
        table3: { table: table3, setTable: setTable3 },
        table4: { table: table4, setTable: setTable4 },
        table5: { table: table5, setTable: setTable5 },
        table6: { table: table6, setTable: setTable6 },
    }

    const [grab, setGrab] = useState({ from: null, ids: [] })

    const drawCard = () => {
        const pick = stock[0]
        let rest = [...stock]
        rest = stock.filter(s => s !== pick)
        if (draw) {
            rest.push(draw)
        }
        setStock(stock => rest)
        setDraw(draw => pick)
    }

    const throwCard = () => {
        let picks = stock.slice(0, 7)
        const rest = stock.filter(s => !picks.includes(s))
        setStock(stock => rest)

        picks.forEach((pick, index) => {
            const { table, setTable } = tables[`table${index}`]
            const open = table.open + 1
            setTable(table => { return { ...table, ids: [pick], open } })
        })
    }

    const grabCard = (from, ids) => {
        if (!ids || !ids.length) return
        setGrab(grab => { return { ...generatePath, from, ids } })
    }

    const releaseCard = (event) => {
        if (!(event.target.closest('.deck') || event.target.closest('.table'))) {
            setGrab(grab => { return { ...generatePath, from: null, ids: [] } })
        }
    }

    const putCard = (target) => {
        if (grab.ids.length > 0) {
            if (target.hasOwnProperty('deck')) {
                target.setTable(deck => { return { ...deck, ids: [...deck.ids, ...grab.ids] } })
            }

            if (target.hasOwnProperty('table')) {
                console.log('table');
            }
        }

        setGrab(grab => { return { ...generatePath, from: null, ids: [] } })
    }

    useEffect(() => {
        throwCard()
        document.addEventListener('mouseup', releaseCard)
    }, [])

    return (
        <div className='unselect'>
            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {/* stock */}
                <div onClick={drawCard} style={{ border: '1px solid cornflowerblue', padding: '1ch' }}>
                    stock [{stock.length}]
                    {stock.map(s => <Card key={s} id={s} />)}
                </div>

                {/* draw */}
                <div onMouseDown={() => grabCard('draw', draw ? [draw] : [])} style={{ border: '1px solid cornflowerblue', padding: '1ch' }} >
                    draw
                    <Card id={draw} />
                </div>

                {/* grab */}
                <div style={{ padding: '1ch', backgroundColor: 'crimson', alignSelf: 'flex-start', borderRadius: '10px', color: 'white', fontSize: '1.4em' }}>
                    grab from {grab.from}
                    {grab.ids.map(g => <Card key={g} id={g} />)}
                </div>
            </div>

            {/* decks */}
            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {Object.keys(decks).map(deckName => {
                    const target = decks[deckName]
                    const ids = target.deck.ids
                    const elm = target.deck.elm
                    return (
                        <div className='deck' onMouseUp={() => putCard(target)} ref={elm} key={deckName} style={{ border: '1px solid olive', padding: '1ch' }} >
                            {deckName}
                            {ids.length > 0 && ids.map(id => <Card key={id} id={id} />)}
                        </div>
                    )
                })}
            </div>

            {/* tables */}
            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {Object.keys(tables).map(tableName => {
                    const target = tables[tableName]
                    const ids = target.table.ids
                    const elm = target.table.elm
                    return (
                        <div className='table' onMouseUp={() => putCard(target)} ref={elm} key={tableName} onMouseDown={() => grabCard(tableName, ids)} style={{ border: '1px solid tomato', padding: '1ch' }}>
                            {tableName}:{target.table.open}
                            {ids.length > 0 && ids.map(id => <Card key={id} id={id} />)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}