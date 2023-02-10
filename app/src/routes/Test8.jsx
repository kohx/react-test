import React, { useState, useRef, useEffect, useLayoutEffect, useMemo, useCallback, createElement } from 'react'
import { generatePath } from 'react-router-dom'

const parCard = 5

const style = {
    card: {
        flex: '0 0 100px',
        border: "1px solid black",
        borderRadius: '5px',
        padding: "0.5ch",
        margin: "0.5ch",
    },
    header: {
        display: 'flex',
        gap: '1ch',
        padding: '1ch',
        position: 'relative',
    },
    grab: {
        padding: '1ch',
        border: '2px solid tomato',
        alignSelf: 'flex-start',
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineEnd: 0,
    },
    stock: {
        border: '1px solid lightgray',
        padding: '1ch',
    },
    draw: {
        border: '1px solid cornflowerblue',
        padding: '1ch',
    },
    tables: {
        display: 'flex',
        gap: '1ch',
        padding: '1ch',
    },
    table: {
        border: '1px solid cornflowerblue',
        padding: '1ch',
    },
    slots: {
        border: '1px solid lightgray',
        padding: '1ch',
        marginBlockEnd: "1ch",
    },
    decks: {
        display: 'flex',
        gap: '1ch',
        padding: '1ch',
    },
    deck: {
        border: '1px solid olive',
        padding: '1ch',
    },
    message: {
        textAlign: 'center',
        fontSize: '2em',
        color: 'orangered',
    },
}

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

const getCard = (id) => cards.find(card => card.id === id)

const Card = ({ id, origin = null, gradCard = null }) => {

    if (!id) return

    const card = getCard(id)

    if (origin && gradCard) {
        return (
            <div onMouseDown={(event) => gradCard(origin, card.id)} style={{ ...style.card, color: card.color }}> [{card.id}] {card.mark}: {card.number} </div >
        )
    }

    return (<div style={{ ...style.card, color: card.color }}>[{card.id}] {card.mark}: {card.number} </div>)
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
    // const [table5, setTable5] = useState({ slots: [], ids: [], elm: useRef(null) })
    // const [table6, setTable6] = useState({ slots: [], ids: [], elm: useRef(null) })

    const tables = {
        table0: { table: table0, setTable: setTable0 },
        table1: { table: table1, setTable: setTable1 },
        table2: { table: table2, setTable: setTable2 },
        table3: { table: table3, setTable: setTable3 },
        table4: { table: table4, setTable: setTable4 },
        // table5: { table: table5, setTable: setTable5 },
        // table6: { table: table6, setTable: setTable6 },
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
            // つかんだカード
            const grabCard = getCard(grab.ids[0])

            // デッキに入れる場合
            if (target.hasOwnProperty('deck')) {

                // デッキを取得
                const deck = target.deck
                // デッキにあるカード
                const deckCards = deck.ids.map(id => getCard(id))
                // デッキにあるカードのナンバーリスト
                const deckNumbers = deckCards.map(deckCard => deckCard.number)
                // デッキにあるカードの最大ナンバー
                const deckMaxNum = deckNumbers.length > 0 ? Math.max(...deckNumbers) : 0

                // デッキには一枚づつ
                const isSingle = grab.ids.length === 1
                // 同じコード（マーク）
                const isSameCode = deck.code === grabCard.code
                // 一つ多い数
                const isRightNum = (deckMaxNum + 1) === grabCard.number

                // チェック
                if (isSingle && isSameCode && isRightNum) {

                    // デッキにセット
                    target.setDeck(deck => { return { ...deck, ids: [...deck.ids, ...grab.ids] } })

                    // ドローから来た場合
                    if (grab.origin === 'draw') {
                        setDraw(null)
                    }
                    // テーブルから来た場合
                    else {
                        // テーブルの取得
                        const { table, setTable } = tables[grab.origin]

                        // テーブルに残るカードID
                        let ids = table.ids.filter(id => !grab.ids.includes(id))

                        // テーブルが空になった場合
                        if (ids.length < 1) {

                            // スロットから取得
                            const id = table.slots[0]
                            // スロットに残るカードID
                            const slots = table.slots.filter(slot => slot !== id)
                            // スロットから取得したIDをテーブルに入れる
                            ids = [id]

                            // テーブルを更新
                            setTable(table => { return { ...table, ids, slots } })
                        } else {
                            setTable(table => { return { ...table, ids } })
                        }
                    }
                    setMessage('set!')
                } else {
                    console.log(isSingle, isSameCode, isRightNum)
                    setMessage('can not!')
                }
            }

            // テーブルに入れる場合
            if (target.hasOwnProperty('table')) {
                console.log('on table');

                // テーブルを取得
                const table = target.table

                // チェック
                if (isSingle && isSameCode && isRightNum) {

                    // ドローから来た場合
                    if (grab.origin === 'draw') {
                        setDraw(null)
                    }
                    // テーブルから来た場合
                    else {

                    }
                }
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
            {message !== '' && <div style={style.message}>{message}</div>}

            <div style={style.header}>
                {/* grab */}
                <div style={style.grab}>
                    grab from {grab.origin}
                    {grab.ids.map(g => <Card key={g} id={g} />)}
                </div>

                {/* stock */}
                <div onClick={drawCard} style={style.stock}>
                    <div>stock [{stock.length}]</div>
                    {/* <div style={{ display: 'none' }}> */}
                    {stock.map(s => <Card key={s} id={s} />)}
                    {/* </div> */}
                </div>

                {/* draw */}
                <div style={style.draw} >
                    draw
                    <Card id={draw} origin={'draw'} gradCard={grabCard} />
                </div>

                {/* decks */}
                <div style={style.decks}>
                    {Object.keys(decks).map(deckName => {
                        const target = decks[deckName]
                        const deck = target.deck
                        return (
                            <div className='deck' onMouseUp={() => putCard(target)} ref={deck.elm} key={deckName} style={style.deck} >
                                {deckName}: <span style={{ color: deck.color }}>{deck.mark}</span>{ }
                                {deck.ids.length > 0 && deck.ids.map(id => <Card key={id} id={id} />)}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* tables */}
            <div style={style.tables}>
                {Object.keys(tables).map(tableName => {
                    const target = tables[tableName]
                    const table = target.table
                    return (
                        <div key={tableName} style={{ border: '1px solid olive', padding: '1ch' }}>
                            {tableName}

                            {table.slots.length > 0 && <div style={style.slots}>
                                {table.slots.map(slot =>
                                    <Card key={slot} id={slot} />
                                )}
                            </div>}

                            <div className='table' onMouseUp={() => putCard(target)} style={style.table}>
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