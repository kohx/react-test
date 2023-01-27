import React, { useState, useRef, useEffect, useMemo } from 'react'
import api from '@/lib/axios/api'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet-ce"

import columns from "../../dist/json/columns"

export default () => {
    // 要素取得
    const jRef = useRef(null)
    const jList = useRef(null)

    // 表の設定
    const options = {
        columns,
        data: [],
        filters: true,
        tableOverflow: true,
        tableHeight: '100vh',
        tableWidth: '100vw',
        columnSorting: false,
        oncreateedit: () => { console.log('create edit!') },
        onchange: () => { console.log('change!') },
        onselection: () => { console.log('selection!') },
        onevent: () => { console.log('event!') },
    }

    // 表フィルタのアウトサイドクリック
    useEffect(() => {
        const handleOutside = (event) => {
            if (event.target.closest('.j-list') === null && !event.target.classList.contains('j-filter')) {
                jList.current.classList.remove('j-list--active')
            }

        }

        // イベント付与
        document.addEventListener('click', handleOutside)

        // イベントのクリーンアップ
        return () => document.removeEventListener('click', handleOutside)
    }, [])


    // 表のレンダー
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

                jRef.current.jspreadsheet.headers.forEach((elm, idx) => {
                    // ソート
                    const sort = document.createElement('span')
                    sort.textContent = 's'
                    sort.classList.add('j-sort')
                    sort.addEventListener('click', (event) => {
                        event.preventDefault()
                        console.log(idx)
                        jRef.current.jspreadsheet.orderBy(idx)
                    })
                    elm.insertAdjacentElement('beforeend', sort);

                    // フィルタ
                    const filter = document.createElement('span')
                    filter.textContent = 'f'
                    filter.classList.add('j-filter')

                    
                    filter.addEventListener('click', (event) => {
                        event.preventDefault()
                        const list = document.createElement('ul')
                        jRef.current.jspreadsheet.getColumnData(idx).forEach(value => {
                            list.insertAdjacentHTML('beforeend', `<li>${value}</li>`)
                        })
                        const clientRect = event.target.getBoundingClientRect()
                        jList.current.innerHTML = "";
                        jList.current.insertAdjacentElement('beforeend', list);
                        jList.current.setAttribute('style', `top: ${clientRect.top + clientRect.height}px; left: ${clientRect.left}px;`)
                        jList.current.classList.add('j-list--active')
                    })

                    elm.insertAdjacentElement('beforeend', filter);
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
            <div className='j-list' ref={jList} style={{ border: '1px solid steelblue', position: 'absolute', display: 'none' }}>list</div>
        </>
    )
}