import React, { useState, useRef, useEffect, useCallback, createElement, ReactNode } from 'react'
import { useImperativeHandle, ForwardRefRenderFunction, forwardRef } from "react"
import api from '@/lib/axios/api'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet"
import jSuites from "jsuites"
import "@/../node_modules/jspreadsheet/dist/jspreadsheet.css"
import fetch from "@/json/fetch"
import "@/test7/test7.css"
import func from "@/test7/test7"
import { ChildProps, Handles, Paginate } from '@/test7/type'

export default forwardRef<Handles, ChildProps>((props: ChildProps, ref?: any) => {

    // todo:: for test
    props = fetch

    // todo:: for test
    props.setMessage = () => {
        console.log('set message!')
    }

    // ライセンス
    jspreadsheet.setLicense('OGI5NWUwNTZjOWNjMzk5MDdmNDU4ODU3YzU4YzcxZjk2ZjA4ZDNkYjk0YjJmNzhmMDdmMTMzZDc4MmVhMDQ0MzBiMWMwZDE1YjM4ZWE1MTgwZDAwOTgxY2FkMTliZTdhMTQxY2YwZWM4YTk4Yzk1ZjQ1OGI1MDM0NWU5MTIxN2UsZXlKdVlXMWxJam9pYTI5b1pXa2lMQ0prWVhSbElqb3hOamMzT0RBeE5qQXdMQ0prYjIxaGFXNGlPbHNpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9qQXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NKZGZRPT0=')

    // スプレッドシートの要素
    const jRef = useRef<any>(null)
    const jWrap = useRef<any>(null)

    const isError = func.isError
    useImperativeHandle(ref, () => ({
        commonRef: { jRef, isError },
    }))

    // スプレッドシートの設定
    let options: any = {
        worksheets: [{
            ...props.options,
            tableOverflow: true,
            // todo:: for test
            // pagination: 1000,
            pagination: 6,
            // 列のドラッグ
            columnDrag: false,
            // Enter キーを使用して新しい列を追加
            allowInsertColumn: false,
        }],
        contextMenu: (obj: any, x: number, y: number, e: any, items: Array<T>, section: string) => func.contextMenu(obj, x, y, e, items, section, props),
        onselection: (obj: any, px: number, py: number, ux: number, uy: number) => func.onSelection(obj, px, py, ux, uy, props.setMessage),
        onchange: (obj: any, cell: any, x: number, y: number, newValue: any) => func.onChange(obj, cell, x, y, newValue, props.setMessage, 0, props),
    }

    // 参照モードの場合
    if (props.mode === 1) {
        // クリックメニューを非表示
        options.contextMenu = (): any => false
    }

    // セルの編集不可
    func.changeReadOnlyCell(props, options)

    // ステート ページネート
    // const [paginate, setPaginate] = useState<Paginate>({ total: 0, current: 1, last: 1, start: 1, end: 1, pages: [] })

    // ページの切り替え
    // const toPage = (current: number) => {
    //     const { last, start, end, pages } = func.createPaginate(paginate.total, current)
    //     jRef.current.jspreadsheet[0].page(current - 1)
    //     setPaginate(paginate => { return { ...paginate, current, last, start, end, pages } })
    // }

    // フックエフェクト
    useEffect(() => {

        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {

            // スプレッドシートの表示
            jspreadsheet(jRef.current, options)


            // ヘッダの必須項目に「*」と色を付ける
            func.setRequireColumn(jRef, options)

            // カラムから参照状態フラグ、表示順、追加対象外フラグのインデックスを取得
            // 関連のあるメタの作成または新規バージョン登録
            // 承認済みの更新またはパッチバージョンが1以上の更新(作成中)
            // 更新（作成中）
            func.setColumnDetails(jRef, options, props)

            // ページネート
            // const total = jRef.current.jspreadsheet[0].quantityOfPages()
            // const current = jRef.current.jspreadsheet[0].pageNumber + 1
            // const { last, start, end, pages } = func.createPaginate(total, current)
            // setPaginate(paginate => { return { ...paginate, total, current, last, start, end, pages } })
        }

        // ハンドルリサイズ関数を作成
        const handleResize = () => {
            const width = jWrap.current.clientWidth
            const height = props.widthType === 2 ? "300px" : "200px"
            console.log(jWrap.current.clientWidth)
            console.log(height)
            jRef.current.jspreadsheet[0].setViewport(width, height)
        }

        // 最初の実行
        handleResize()

        // リサイズイベント
        window.addEventListener('resize', handleResize)

        // クリーンアップ処理: リターンでイベントを削除
        return () => window.removeEventListener('resize', handleResize)

        const handleScroll = () => {

        }
    }, [options, props,
        // paginate,
    ])

    // フックエフェクト
    useEffect(() => {

        // ハンドルリサイズ関数を作成
        const handleResize = () => {
            const width = jWrap.current.clientWidth
            const height = props.widthType === 2 ? "300px" : "200px"
            console.log(jWrap.current.clientWidth)
            console.log(height)
            jRef.current.jspreadsheet[0].setViewport(width, height)
        }

        // 最初の実行
        handleResize()

        // リサイズイベント
        window.addEventListener('resize', handleResize)

        // クリーンアップ処理: リターンでイベントを削除
        return () => window.removeEventListener('resize', handleResize)
    }, [props])

    // フックエフェクト
    useEffect(() => {

        const jssContent = document.querySelector('.jss_content')!
        console.log(jssContent);

        // ハンドルスクロール関数を作成
        const handleTableScroll = (event: Event) => {
            func.setRequireColumn(jRef, options)
        }

        // スクロールイベント
        jssContent.addEventListener('scroll', handleTableScroll)

        // クリーンアップ処理: リターンでイベントを削除
        return () => jssContent.removeEventListener('resize', handleTableScroll)
    }, [props])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
            <div className="test7-wrapper" ref={jWrap}>
                <div className='test7-table' ref={jRef} />
            </div>
            {/* <div className='pagination'>
                <div>{paginate.total}ページ中 {paginate.current}ページを表示</div>
                <ul className='pagination__list'>
                    {paginate.start !== paginate.current && <li className="pagination__item" onClick={() => toPage(1)}>&lt;</li>}
                    {paginate.pages.length > 1 && paginate.pages.map(page =>
                        <li key={page.num} className={page.className} onClick={() => toPage(page.num)}>{page.num}</li>
                    )}
                    {paginate.end !== paginate.current && <li className="pagination__item" onClick={() => toPage(paginate.last)}>&gt;</li>}
                </ul>
            </div> */}
        </>
    )
})