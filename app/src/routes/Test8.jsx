import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, createElement } from 'react'
import { generatePath } from 'react-router-dom'

const parCard = 12

const createCards = () => {
    let cards = []
    let count = 0
    const templates = [{ code: 0, mark: '♦', color: 'red' }, { code: 1, mark: '♠', color: 'black' }, { code: 2, mark: '♥', color: 'red' }, { code: 3, mark: '♣', color: 'black' }]
    templates.forEach(card => {
        for (let index = 1; index <= parCard; index++) {
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
console.log(cards);


const getCard = (id) => cards.find(card => card.id === id)

const Card = ({ id, origin = null, gradCard = null }) => {

    if (!id) return

    const card = getCard(id)

    const style = {
        flex: '0 0 100px', color: `${card.color}`, border: "1px solid black", borderRadius: '5px', padding: "0.5ch", margin: "0.5ch"
    }

    if (origin && gradCard) {
        return (
            <div onMouseDown={(event) => gradCard(origin, card.id)} style={style}>[{card.id}] {card.mark}: {card.number} </div>
        )
    }

    return (<div style={style}>[{card.id}] {card.mark}: {card.number} </div>)
}

export default () => {

    const [message, setMessage] = useState('')

    const [stock, setStock] = useState(shuffle(cards))

    const [draw, setDraw] = useState(null)

    const [deck0, setDeck0] = useState({ code: 0, mark: '♦', color: "red", ids: [], elm: useRef(null) })
    const [deck1, setDeck1] = useState({ code: 1, mark: '♠', color: "black", ids: [], elm: useRef(null) })
    const [deck2, setDeck2] = useState({ code: 2, mark: '♥', color: "red", ids: [], elm: useRef(null) })
    const [deck3, setDeck3] = useState({ code: 3, mark: '♣', color: "black", ids: [], elm: useRef(null) })


    const decks = {
        deck0: { deck: deck0, setDeck: setDeck0 },
        deck1: { deck: deck1, setDeck: setDeck1 },
        deck2: { deck: deck2, setDeck: setDeck2 },
        deck3: { deck: deck3, setDeck: setDeck3 },
    }

    const [table0, setTable0] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table1, setTable1] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table2, setTable2] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table3, setTable3] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table4, setTable4] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table5, setTable5] = useState({ slots: [], ids: [], elm: useRef(null) })
    const [table6, setTable6] = useState({ slots: [], ids: [], elm: useRef(null) })

    const tables = {
        table0: { table: table0, setTable: setTable0 },
        table1: { table: table1, setTable: setTable1 },
        table2: { table: table2, setTable: setTable2 },
        table3: { table: table3, setTable: setTable3 },
        table4: { table: table4, setTable: setTable4 },
        table5: { table: table5, setTable: setTable5 },
        table6: { table: table6, setTable: setTable6 },
    }

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
        const totalTable = Object.keys(tables).length
        const totalThrow = totalTable * (totalTable + 1) / 2

        // 配るID
        let picks = stock.slice(0, totalThrow)

        // 残りのID
        const rest = stock.filter(s => !picks.includes(s))

        // 残りのIDをストックにセット
        setStock(stock => rest)

        Object.values(tables).forEach((table, tableIndex) => {
            const ids = picks.slice(0, 1)
            const slots = picks.slice(1, tableIndex + 1)
            picks = picks.filter(p => ![...ids, ...slots].includes(p))
            table.setTable(table => { return { ...table, ids, slots } })
        })
    }

    const [grab, setGrab] = useState({ origin: null, ids: [] })

    const grabCard = (origin, id) => {

        if (!id || !origin) return

        let ids
        if (origin === 'draw') {
            ids = [id]
        } else {
            const cardNum = getCard(id).number
            const table = tables[origin].table
            const tableCards = table.ids.map(id => getCard(id))
            const lowerCard = tableCards.filter(tableCard => tableCard.number <= cardNum)
            ids = lowerCard.map(card => card.id)
        }

        // カードをブラッブにセット
        setGrab(grab => { return { ...generatePath, origin, ids } })
    }

    const releaseCard = (event) => {
        if (!(event.target.closest('.deck') || event.target.closest('.table'))) {
            setGrab(grab => { return { ...generatePath, origin: null, ids: [] } })
        }
    }

    const putCard = (target) => {

        if (grab.ids.length > 0) {
            if (target.hasOwnProperty('deck')) {

                // todo チェックを入れる
                const deck = target.deck
                const deckCards = deck.ids.map(id => getCard(id))
                const deckNumbers = deckCards.map(deckCard => deckCard.number)
                console.log(deckNumbers);

                const deckMaxNum = deckNumbers.length > 0 ? Math.max(...deckNumbers) : 0
                const grabCard = getCard(grab.ids[0])

                const isSingle = grab.ids.length === 1
                const isSameCode = deck.code === grabCard.code
                const isRightNum = (deckMaxNum + 1) === grabCard.number


                if (isSingle && isSameCode && isRightNum) {
                    setMessage('set!')
                    target.setDeck(deck => { return { ...deck, ids: [...deck.ids, ...grab.ids] } })
                    setDraw(null)
                } else {
                    setMessage('can not!')
                    console.log(isSingle, isSameCode, isRightNum);
                }
            }

            if (target.hasOwnProperty('table')) {
                //     const table = target.table
                //     const tableCards = table.ids.map(id => getCard(id))
                //     const tableMaxNum = Math.max(tableCards.map(tableCard => tableCard.number))

                //     // const grabMaxNum = Math.max(grabCards.map(grabCard => grabCard.number))

                //     const res = tableCards.some(grabCard => {
                //     })
            }
            setGrab(grab => { return { ...generatePath, origin: null, ids: [] } })
        }

        setGrab(grab => { return { ...generatePath, from: null, ids: [] } })
    }

    useEffect(() => {
        throwCard()
        document.addEventListener('mouseup', releaseCard)
    }, [])

    return (
        <div className='unselect'>
            {message !== '' && <div style={{ textAlign: 'center', fontSize: '2em', color: 'orangered' }}>{message}</div>}


            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {/* stock */}
                <div onClick={drawCard} style={{ border: '1px solid lightgray', padding: '1ch' }}>
                    <div>stock [{stock.length}]</div>
                    <div style={{ display: 'none' }}>
                        {stock.map(s => <Card key={s} id={s} />)}
                    </div>
                </div>

                {/* draw */}
                <div style={{ border: '1px solid cornflowerblue', padding: '1ch' }} >
                    draw
                    <Card id={draw} origin={'draw'} gradCard={grabCard} />
                </div>

                {/* grab */}
                <div style={{ padding: '1ch', border: '2px solid tomato', alignSelf: 'flex-start' }}>
                    grab from {grab.origin}
                    {grab.ids.map(g => <Card key={g} id={g} />)}
                </div>
            </div>

            {/* decks */}
            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {Object.keys(decks).map(deckName => {
                    const target = decks[deckName]
                    const deck = target.deck
                    return (
                        <div className='deck' onMouseUp={() => putCard(target)} ref={deck.elm} key={deckName} style={{ border: '1px solid olive', padding: '1ch' }} >
                            {deckName}: <span style={{ color: deck.color }}>{deck.mark}{deck.code}</span>{ }
                            {deck.ids.length > 0 && deck.ids.map(id => <Card key={id} id={id} />)}
                        </div>
                    )
                })}
            </div>

            {/* tables */}
            <div style={{ display: 'flex', gap: '1ch', padding: '1ch' }}>
                {Object.keys(tables).map(tableName => {
                    const target = tables[tableName]
                    const table = target.table
                    return (
                        <div key={tableName} style={{ border: '1px solid olive', padding: '1ch' }}>
                            {tableName}

                            {table.slots.length > 0 && <div style={{ border: '1px solid lightgray', padding: '1ch', marginBlockEnd: "1ch" }}>
                                {table.slots.map(slot =>
                                    <Card key={slot} id={slot} />
                                )}
                            </div>}

                            <div className='table' onMouseUp={() => putCard(target)} style={{ border: '1px solid cornflowerblue', padding: '1ch' }}>
                                {table.ids.length > 0 && table.ids.map(id =>
                                    <Card key={id} id={id} origin={tableName} gradCard={grabCard} />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}