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
        // フィルタボックスを作成
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

        // ラッパエレメントを取得
        const wrapElm = filter.querySelector('.j-wrap')

        // ラッパエレメントにイベント追加
        wrapElm.addEventListener('click', (event) => {
            // 親のイベントをキャンセル
            event.stopPropagation()
        })

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

            // カラムの縦リストを取得
            let columnList = jRef.current.jspreadsheet.getColumnData(columnIdx)

            // 重複削除
            columnList = [...new Set(columnList)]

            // 空文字削除
            columnList = columnList.filter((value) => {
                return value != ''
            })

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
                    let actives = wrapElm.dataset.active?.split(',') ?? []

                    if (event.target.checked) {
                        actives.push(event.target.value)
                    } else {
                        actives = actives.filter((value) => value != event.target.value)
                    }
                    // データセットに設定
                    wrapElm.dataset.active = actives.join(',')
                })
                listElm.insertAdjacentElement('beforeend', itemElm)
            })

            // 表示させる
            wrapElm.style.display = "block"
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