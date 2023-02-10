import React, { useState, useRef, useEffect, useMemo, useCallback, createElement } from 'react'
import api from '@/lib/axios/api'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet-ce"

import columns from "@/json/columns"

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
        minSpareRows: 8,
        // onafterchanges: (records) => { console.log('onafterchanges!') },
        // onbeforechange: (el, cell, x, y, value) => { console.log('onbeforechange!') },
        // oneditionend: (el, cell, x, y, value, save) => { console.log('oneditionend!') },
        // oneditionstart: (el, cell, x, y) => { console.log('oneditionstart!') },
        // onbeforesave: (el, obj, data) => { console.log('onbeforesave!') },
        // onsave: (el, obj, data) => { console.log('onsave!') },
        // onchange: (el, cell, x, y, value, oldValue) => { console.log('onchange!') },
        onselection: (el, px, py, ux, uy, origin) => {
            console.log('onselection!')
            console.log(el)
            console.log(`${px}:${py}`)
            console.log(`${ux}:${uy}`)
            console.log(origin)
        },
        // onsort: (el, column, order) => { console.log('onsort!') },
        // onbeforeinsertcolumn: (el, columnNumber, numOfColumns, insertBefore) => { console.log('onbeforeinsertcolumn!') },
        // oninsertcolumn: (el, columnNumber, numOfColumns, historyRecords, insertBefore) => { console.log('oninsertcolumn!') },
        // onbeforedeletecolumn: (el, columnNumber, numOfColumns) => { console.log('onbeforedeletecolumn!') },
        // ondeletecolumn: (el, columnNumber, numOfColumns, historyRecords) => { console.log('ondeletecolumn!') },
        // onmovecolumn: (el, o, d) => { console.log('onmovecolumn!') },
        // onresizecolumn: (el, column, width, oldWidth) => { console.log('onresizecolumn!') },
        // onbeforeinsertrow: (el, rowNumber, numOfRows, insertBefore) => { console.log('onbeforeinsertrow!') },
        // oninsertrow: (el, rowNumber, numOfRows, rowRecords, insertBefore) => { console.log('oninsertrow!') },
        // onbeforedeleterow: (el, rowNumber, numOfRows) => { console.log('onbeforedeleterow!') },
        // ondeleterow: (el, rowNumber, numOfRows, rowRecords) => { console.log('ondeleterow!') },
        // onmoverow: (el, o, d) => { console.log('onmoverow!') },
        // onresizerow: (el, row, height, oldHeight) => { console.log('onresizerow!') },
        // onchangeheader: (el, column, oldValue, newValue) => { console.log('onchangeheader!') },
        // onchangemeta: (el, o, k, v) => { console.log('onchangemeta!') },
        // onchangepage: (el, pageNumber, oldPage) => { console.log('onchangepage!') },
        // onchangestyle: (el, o, k, v) => { console.log('onchangestyle!') },
        // oncomments: (el, comments, title, cells) => { console.log('oncomments!') },
        // oncreateeditor: (el, cell, x, y, editor) => { console.log('oncreateeditor!') },
        // onblur: (el) => { console.log('onblur!') },
        // onfocus: (el) => { console.log('onfocus!') },
        // onload: (el, obj) => { console.log('onload!') },
        // onmerge: (el, cellName, colspan, rowspan) => { console.log('onmerge!') },
        // oncopy: (el, row, hashString) => { console.log('oncopy!') },
        // onbeforepaste: (el, data, x, y) => { console.log('onbeforepaste!') },
        // onpaste: (el, data) => { console.log('onpaste!') },
        // onundo: (el, historyRecord) => { console.log('onundo!') },
        // onredo: (el, historyRecord) => { console.log('onredo!') },
    }

    /**
     * ! 表フィルタのアウトサイドクリック
     */
    useEffect(() => {
        const handleOutside = (event) => {
            const target = event.target
            if (!(target.classList.contains('j-filter') || target.classList.contains('j-item') || target.classList.contains('j-check') || target.classList.contains('j-label'))) {
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
     * @param {Number} columnIdx 
     */
    const createSortButton = (target, columnIdx) => {
        const sortElm = document.createElement('span')
        sortElm.textContent = 's'
        sortElm.classList.add('j-sort')
        sortElm.addEventListener('click', (event) => {
            event.preventDefault()
            jRef.current.jspreadsheet.orderBy(columnIdx)
        })
        target.insertAdjacentElement('beforeend', sortElm);
    }

    /**
     * create filter button
     * @param {Element} target 
     * @param {Number} idx  
     */
    const createFilterButton = (target, columnIdx) => {
        // テーブルボディーを取得
        const table = document.querySelector('.jexcel tbody')

        // フィルタボックスを作成
        const filter = createDom(`
        <div class="j-filter">f
            <div class="j-wrap">
                <ul class="j-list">
                </ul>
                <button class="j-cancel">cancel</button>
                <button class="j-ok">ok</button>
            </div>
        </div>
        `)

        // ラッパエレメントを取得
        const wrapElm = filter.querySelector('.j-wrap')

        // ラッパエレメントにイベント追加
        wrapElm.addEventListener('click', (event) => {
            // 親のイベントをキャンセル
            event.stopPropagation()
        })

        //! カラムの縦リストを取得
        // let columnList = jRef.current.jspreadsheet.getColumnData(columnIdx)
        const columnElms = table.querySelectorAll(`td:nth-child(${columnIdx + 2})`)
        let columnList = [];
        for (const columnElm of columnElms) {
            //! 非表示のとき
            columnList.push(columnElm.textContent)
        }
        console.log(columnList);

        // 重複削除
        columnList = [...new Set(columnList)]

        // 空文字削除
        columnList = columnList.filter((value) => {
            return value != ''
        })

        // 全選択状態をラップデータセットに設定
        wrapElm.dataset.active = columnList.join(',')

        // リストエレメント取得
        const listElm = filter.querySelector('.j-list')

        // フィルタエレメント（ボタン）にイベント追加
        filter.addEventListener('click', (event) => {
            // デフォルトイベント停止
            event.preventDefault()

            // すべて非表示
            document.querySelectorAll('.j-wrap').forEach(elm => {
                elm.style.display = 'none'
            })

            // 中身を空にする
            listElm.innerHTML = ''

            // アクティブ リスト
            let activeList = wrapElm.dataset.active?.split(',') ?? []

            // リストにアイテムを追加していく
            columnList.forEach((value, rowIndex) => {
                // アイテムを作成
                const itemElm = createDom(`
                <li class="j-item">
                    <label class="j-label"><input class="j-check" type="checkbox" value="${value}" />${value}<label>
                </li>
                `)

                // アイテムのチェックボックスを取得
                const inputElm = itemElm.querySelector('.j-check')
                // アクティブのとき
                inputElm.checked = activeList.includes(String(value))

                // アイテムのチェックボックスにイベントを追加
                inputElm.addEventListener('change', (event) => {
                    // todo:: true false 逆にする
                    // チェックを追加した場合は配列に追加
                    if (event.target.checked) {
                        activeList.push(event.target.value)
                    }
                    // チェックを外したときは配列から削除
                    else {
                        activeList = activeList.filter((value) => value != event.target.value)
                    }
                    // データセットに設定
                    wrapElm.dataset.active = activeList.join(',')
                })
                listElm.insertAdjacentElement('beforeend', itemElm)
            })

            // 表示させる
            wrapElm.style.display = "block"
        })

        // キャンセル エレメント取得
        const cancelElm = filter.querySelector('.j-cancel')
        cancelElm.addEventListener('click', (event) => {
            wrapElm.style.display = 'none'
            // 元に戻す
        })

        // OK エレメント取得
        const okElm = filter.querySelector('.j-ok')
        okElm.addEventListener('click', (event) => {
            wrapElm.style.display = 'none'
            // フィルタする
            // 現在のフィルタを取得
            let activeList = wrapElm.dataset.active?.split(',') ?? []
            // テーブル取得
            const table = document.querySelector('.jexcel tbody')
            // カラムアイテムを取得してまわる
            const columnItems = table.querySelectorAll(`td:nth-child(${columnIdx + 2})`);
            for (const columnItem of columnItems) {
                // フィルタにヒットした場合
                if (!activeList.includes(columnItem.textContent)) {
                    columnItem.closest('tr').style.display = 'none'
                } else {
                    columnItem.closest('tr').style.display = 'table-row'
                }
            }
        })

        target.insertAdjacentElement('beforeend', filter)
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

                // 各カラムを回る
                jRef.current.jspreadsheet.headers.forEach((target, columnIdx) => {
                    // フィルタボックスを閉じる
                    document.querySelector('.jexcel_content').addEventListener('scroll', () => {
                        document.querySelectorAll('.j-wrap').forEach(elm => {
                            if (elm.style.display !== 'none') {
                                elm.style.display = 'none'
                            }
                        })
                    })

                    //! ソートボタンを追加
                    createSortButton(target, columnIdx)

                    //! フィルタボタンを追加     
                    createFilterButton(target, columnIdx)
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