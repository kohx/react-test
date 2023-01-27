import React, { useState, useRef, useEffect, useMemo, useCallback, createElement } from 'react'
import api from '@/lib/axios/api'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet-ce"

import columns from "../../dist/json/columns"

export default () => {
    /**
     * ! 要素取得
     */
    const jRef = useRef(null)

    /**
     * ! 表の設定
     */
    const options = {
        columns,
        data: [],
        filters: false,
        tableOverflow: true,
        tableHeight: '100vh',
        tableWidth: '100vw',
        columnSorting: false,
        oncreateedit: () => { console.log('create edit!') },
        onchange: () => { console.log('change!') },
        onselection: () => { console.log('selection!') },
        onevent: () => { console.log('event!') },
    }

    /**
     * ! 表フィルタのアウトサイドクリック
     */
    useEffect(() => {
        const handleOutside = (event) => {
            const target = event.target
            if (!(target.classList.contains('j-filter') || target.classList.contains('j-item'))) {
                document.querySelectorAll('.j-wrap').forEach(elm => {
                    elm.style.display = 'none'
                })
            }
        }

        // イベント付与
        document.addEventListener('click', handleOutside)

        // イベントのクリーンアップ
        return () => document.removeEventListener('click', handleOutside)
    }, [])

    /**
     * ! 表のレンダー
     */

    /**
     * create dom
     * @param {String} htmlString 
     * @returns {Element}
     */
    const createDom = (htmlString) => {
        const tempElm = document.createElement('div')
        tempElm.innerHTML = htmlString.trim()
        return tempElm.firstElementChild
    }

    /**
     * create sort button
     * @param {Element} target 
     * @param {Number} idx 
     */
    const createSortButton = (target, idx) => {
        const sortElm = document.createElement('span')
        sortElm.textContent = 's'
        sortElm.classList.add('j-sort')
        sortElm.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(idx)
            jRef.current.jspreadsheet.orderBy(idx)
        })
        target.insertAdjacentElement('beforeend', sortElm);
    }

    useEffect(() => {
        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options)
        } else {
            // 非同期処理
            (async () => {
                // レコード取得
                const { state, data } = await api.getRecords()

                // レコード整形
                const record = data.map((value) => {
                    return Object.values(value)
                })

                // レコードのセット
                jRef.current.jspreadsheet.setData(record)

                jRef.current.jspreadsheet.headers.forEach((target, columnIdx) => {
                    // ソート
                    createSortButton(target, columnIdx)

                    // フィルタ
                    const filter = createDom(`
                    <div class="j-filter">f
                        <div class="j-wrap">
                            <ul class="j-list">
                            </ul>
                            <button class="j-cancel">cancel</button>
                            <button class="j-done">ok</button>
                        </div>
                    </div>
                    `)

                    const wrapElm = filter.querySelector('.j-wrap')
                    const listElm = filter.querySelector('.j-list')

                    filter.addEventListener('click', (event) => {
                        // デフォルトイベント停止
                        event.preventDefault()

                        // すべて非常時
                        document.querySelectorAll('.j-wrap').forEach(elm => {
                            elm.style.display = 'none'
                        })

                        // 中身を空にする
                        listElm.innerHTML = ''

                        // カラムの縦リストを取得
                        let columnList = jRef.current.jspreadsheet.getColumnData(columnIdx)

                        // 重複削除
                        // columnList = Array.from(new Set(columnList))
                        columnList = [...new Set(columnList)]

                        // 空文字削除
                        columnList = columnList.filter((value) => {
                            return value != ''
                        })

                        // リストを追加していく
                        columnList.forEach((value, rowIndex) => {
                            const itemElm = document.createElement('li')
                            itemElm.textContent = value
                            itemElm.classList.add('j-item')
                            itemElm.addEventListener('click', (event) => {
                                event.preventDefault()
                                console.log(columnIdx)
                                // console.log(rowIndex)　これは重複削除でつかえない
                            })
                            listElm.insertAdjacentElement('beforeend', itemElm)
                        })

                        // 表示させる
                        wrapElm.style.display = "block"
                    })

                    target.insertAdjacentElement('beforeend', filter)
                });
            })()
        }
    }, [])

    const addRow = () => {
        jRef.current.jspreadsheet.insertRow(4)
    }
    const removeRow = () => {
        jRef.current.jspreadsheet.deleteRow(1)
    }

    const getData = () => {
        console.log(jRef.current.jspreadsheet.getData())
        console.log(jRef.current.jspreadsheet.getJson())
        console.log(jRef.current.jspreadsheet.getRowData(1))
        console.log(jRef.current.jspreadsheet.getValue("C3"))
        console.log(jRef.current.jspreadsheet.getValueFromCoords(0, 0))
        console.log(jRef.current.jspreadsheet.getValueFromCoords(1, 1))
        console.log(jRef.current.jspreadsheet.getValueFromCoords(2, 2))
        console.log(jRef.current.jspreadsheet.getCell('A1'))
        console.log(jRef.current.jspreadsheet.getConfig())
    }

    return (
        <>
            <div ref={jRef} />
            <div onClick={addRow}>Add new row</div>
            <div onClick={removeRow}>remove row</div>
            <div onClick={getData}>get data</div>
            {/* <div className='j-list' ref={jList} style={{ border: '1px solid steelblue', position: 'absolute', display: 'none' }}>list</div> */}
        </>
    )
}