import React, { useState, useRef, useEffect, useCallback, createElement } from 'react'
import { useImperativeHandle, ForwardRefRenderFunction, forwardRef } from "react";
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

export default forwardRef((props, ref) => {
    // ライセンス
    jspreadsheet.setLicense('OGI5NWUwNTZjOWNjMzk5MDdmNDU4ODU3YzU4YzcxZjk2ZjA4ZDNkYjk0YjJmNzhmMDdmMTMzZDc4MmVhMDQ0MzBiMWMwZDE1YjM4ZWE1MTgwZDAwOTgxY2FkMTliZTdhMTQxY2YwZWM4YTk4Yzk1ZjQ1OGI1MDM0NWU5MTIxN2UsZXlKdVlXMWxJam9pYTI5b1pXa2lMQ0prWVhSbElqb3hOamMzT0RBeE5qQXdMQ0prYjIxaGFXNGlPbHNpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9qQXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NKZGZRPT0=');

    // スプレッドシートの要素
    const jRef = useRef(null)

    const isError = func.isError
    useImperativeHandle(ref, () => ({
        commonRef: { jRef, isError },
    }))

    // だみー！
    fetch.setMessage = () => {
        console.log('set message!')
    }


    // スプレッドシートの設定
    let options = {
        worksheets: [{
            ...fetch.options,
            // Todo:: 
            // pagination: 1000,
            pagination: 6,
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

    // ステート ページネート
    const [paginate, setPaginate] = useState({ total: null, current: 1, last: 1, start: 1, end: 1, pages: [] })

    // ページの切り替え
    const toPage = (current) => {
        const { last, start, end, pages } = func.createPaginate(paginate.total, current);
        jRef.current.jspreadsheet[0].page(current - 1)
        setPaginate(paginate => { return { ...paginate, current, last, start, end, pages } })
    }

    // フックエフェクト
    useEffect(() => {

        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {

            // スプレッドシートの表示
            jspreadsheet(jRef.current, options)

            // ヘッダの必須項目に「*」と色を付ける
            func.setRequireColumn(jRef, options)


            //! カラムから参照状態フラグ、表示順、追加対象外フラグのインデックスを取得
            let refIndex
            let seqIndex
            let notCoveredIndex
            let codeIndex
            const columns = options.worksheets[0].columns

            for (var i = 0; i < columns.length; i++) {
                //コード
                if (columns[i].metaKey === "code") {
                    codeIndex = i;
                    continue;
                }
                //参照状態フラグ
                if (columns[i].metaKey === "referenceMetaFlag") {
                    refIndex = i;
                    continue;
                }
                //並び順
                if (columns[i].metaKey === "seq") {
                    seqIndex = i;
                    continue;
                }
                //追加対象外フラグ
                if (columns[i].metaKey === "notCoveredFlag") {
                    notCoveredIndex = i;
                    continue;
                }
            }

            //! 関連のあるメタの作成または新規バージョン登録
            if (
                // true
                fetch.editMode === constEditMode.copyRelationCreate || fetch.editMode === constEditMode.newVersionCreate
            ) {
                const rows = options.worksheets[0].data
                rows.forEach((row, i) => {
                    row.forEach((value, j) => {
                        //参照フラグが2の場合は表示順と追加対象外フラグ以外は変更不可にする
                        if (rows[i][refIndex] === "2" && j !== seqIndex + 1 && j !== notCoveredIndex + 1) {
                            // セルを取得
                            const cell = jRef.current.jspreadsheet[0].getCellFromCoords(j, i)
                            jRef.current.jspreadsheet[0].setReadOnly(cell, true)
                        }
                    })
                })
            }
            //! 承認済みの更新またはパッチバージョンが1以上の更新(作成中)
            // else if (
            //     props.editMode === constEditMode.approvedNewVersionCreate ||
            //     (updatePatchVersion && updatePatchVersion > 0)
            // ) {
            //     //参照状態フラグからセルの変更可否を設定
            //     for (i = 0; i < jRef.current.jexcel.rows.length; i++) {
            //         for (let k = 1; k < jRef.current.jexcel.rows[i].cells.length; k++) {
            //             //追加対象外フラグについては参照フラグの値に関わらず変更不可
            //             //参照フラグが1または2の場合は表示順以外も変更不可にする
            //             if (
            //                 k === notCoveredIndex + 1 ||
            //                 k === codeIndex + 1 ||
            //                 ((jRef.current.jexcel.rows[i].cells[refIndex + 1].textContent ===
            //                     "1" ||
            //                     jRef.current.jexcel.rows[i].cells[refIndex + 1].textContent ===
            //                     "2") &&
            //                     k !== seqIndex + 1)
            //             ) {
            //                 //チェックボックス
            //                 if (jRef.current.jexcel.rows[i].cells[k].children.length > 0) {
            //                     jRef.current.jexcel.rows[i].cells[k].className = "readonly";
            //                     jRef.current.jexcel.rows[i].cells[k].children[0].disabled = true;
            //                 } else {
            //                     jRef.current.jexcel.rows[i].cells[k].className = "readonly";
            //                 }
            //             }
            //         }
            //     }
            // }
            //! 更新（作成中）
            // else if (props.editMode === constEditMode.update) {
            //     //参照状態フラグからセルの変更可否を設定
            //     for (i = 0; i < jRef.current.jexcel.rows.length; i++) {
            //         for (let l = 1; l < jRef.current.jexcel.rows[i].cells.length; l++) {
            //             //参照フラグが2の場合は表示順以外は変更不可にする
            //             if (jRef.current.jexcel.rows[i].cells[refIndex + 1].textContent === "2" && l !== seqIndex + 1 && l !== notCoveredIndex + 1) {
            //                 //チェックボックス
            //                 if (jRef.current.jexcel.rows[i].cells[l].children.length > 0) {
            //                     jRef.current.jexcel.rows[i].cells[l].className = "readonly";
            //                     jRef.current.jexcel.rows[i].cells[l].children[0].disabled = true;
            //                 } else {
            //                     jRef.current.jexcel.rows[i].cells[l].className = "readonly";
            //                 }
            //             }
            //         }
            //     }
            // }

            // ページネート
            const total = jRef.current.jspreadsheet[0].quantityOfPages()
            const current = jRef.current.jspreadsheet[0].pageNumber + 1
            const { last, start, end, pages } = func.createPaginate(total, current);
            setPaginate(paginate => { return { ...paginate, total, current, last, start, end, pages } })
        }
    }, [options, fetch, paginate])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
            <div className="test7-wrapper" style={{ height: tableHeight }}>
                <div className='test7-table' ref={jRef} />
            </div>
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
        </>
    )
})