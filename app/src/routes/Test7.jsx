import React, { useState, useRef, useEffect, useCallback, createElement } from 'react'
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
            pagination: 1,
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

    // ページネート
    const [paginate, setPaginate] = useState({ total: null, current: 1, last: 1, start: 1, end: 1, pages: [] })

    const toPage = (current) => {
        const { last, start, end, pages } = func.createPaginate(paginate.total, current);
        jRef.current.jspreadsheet[0].page(current - 1)
        setPaginate(paginate => { return { ...paginate, current, last, start, end, pages } })
    }


    useEffect(() => {
        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {

            // スプレッドシートの表示
            jspreadsheet(jRef.current, options)

            // ヘッダの必須項目に「*」と色を付ける
            func.setRequireColumn(jRef, options)

            // ページネート
            const total = jRef.current.jspreadsheet[0].quantityOfPages()
            const current = jRef.current.jspreadsheet[0].pageNumber + 1
            const { last, start, end, pages } = func.createPaginate(total, current);
            setPaginate(paginate => { return { ...paginate, total, current, last, start, end, pages } })
        }
    }, [paginate])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
            <div className="test7-wrapper" style={{ height: tableHeight }}>
                <div className='test7-table' ref={jRef} />
                <div className='pagination'>
                    <div>{paginate.total}ページ中 {paginate.current}ページを表示</div>
                    <ul className='pagination__list'>
                        {paginate.start !== paginate.current && <li className="pagination__item" onClick={() => toPage(1, paginate, setPaginate)}>&lt;</li>}
                        {paginate.pages.length > 1 && paginate.pages.map(page =>
                            <li key={page.num} className={page.className} onClick={() => toPage(page.num, paginate, setPaginate)}>{page.num}</li>
                        )}
                        {paginate.end !== paginate.current && <li className="pagination__item" onClick={() => toPage(paginate.last, paginate, setPaginate)}>&gt;</li>}
                    </ul>
                </div>
            </div>
        </>
    )
}