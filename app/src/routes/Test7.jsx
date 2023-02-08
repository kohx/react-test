import React, { useState, useRef, useEffect, useMemo, useCallback, createElement } from 'react'
import api from '@/lib/axios/api'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet"
import jSuites from "jsuites";
import "@/../node_modules/jspreadsheet/dist/jspreadsheet.css"
// import columns from "../../dist/json/columns"
import fetch from "../../dist/json/fetch"
import "@/test7/test7.css"
import func from "@/test7/test7"
import { constEditMode, constNumberingRule } from "@/test7Const";

export default () => {
    // ライセンス
    jspreadsheet.setLicense('OGI5NWUwNTZjOWNjMzk5MDdmNDU4ODU3YzU4YzcxZjk2ZjA4ZDNkYjk0YjJmNzhmMDdmMTMzZDc4MmVhMDQ0MzBiMWMwZDE1YjM4ZWE1MTgwZDAwOTgxY2FkMTliZTdhMTQxY2YwZWM4YTk4Yzk1ZjQ1OGI1MDM0NWU5MTIxN2UsZXlKdVlXMWxJam9pYTI5b1pXa2lMQ0prWVhSbElqb3hOamMzT0RBeE5qQXdMQ0prYjIxaGFXNGlPbHNpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9qQXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NKZGZRPT0=');

    /**
     * ! 要素取得
     */
    const jRef = useRef(null)
    const jPagination = useRef(null)

    // だみー！
    fetch.setMessage = () => {
        alert('set message!')
    }

    /**
     * ! 表の設定
     */
    let options = {
        worksheets: [{
            ...fetch.options,
            // Todo:: pagination: 1000,
            pagination: 4,
            paginationOptions: [10, 25, 50, 100],
            // 列のドラッグ
            columnDrag: false,
            // 列の並べ替えを
            columnSorting: false,
            // Enter キーを使用して新しい列を追加
            allowInsertColumn: false,
        }],
        contextMenu: (obj, x, y, e, items, section) => func.contextMenu(obj, x, y, e, items, section),
        onselection: (obj, px, py, ux, uy) => func.onSelection(obj, px, py, ux, uy, fetch.setMessage),
        onchange: (obj, cell, x, y, newValue) => func.onChange(obj, cell, x, y, newValue, fetch.setMessage, 0),
    }

    // 参照モードの場合
    if (fetch.mode === 1) {
        // クリックメニューを非表示
        options.contextMenu = () => false
    }

    // セルの編集不可
    func.changeReadOnlyCell(fetch.mode, options)

    // ワイドタイプで高さを変更
    const tableHeight = fetch.widthType === 1 ? '30%' : '60%'

    useEffect(() => {
        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {

            jspreadsheet(jRef.current, options)

            // ヘッダの必須項目に「*」と色を付ける
            func.setRequireColumn(jRef, options)

            // ページネート作成用
            const totalPage = jRef.current.jspreadsheet[0].quantityOfPages()
            // console.log(totalPage);
            const toPage = (page) => jRef.current.jspreadsheet[0].page(page - 1)
            // toPage(3)
            const currentPage = jRef.current.jspreadsheet[0].pageNumber + 1
            // console.log(currentPage);
        }
    }, [])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
            <div className="test7-wrapper" style={{ height: tableHeight }}>
                <div className='test7-table' ref={jRef} />
                <div className='test7-pagination' ref={jPagination} ></div>
            </div>
        </>
    )
}