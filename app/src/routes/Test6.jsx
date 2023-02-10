import React, { useState, useRef, useEffect } from 'react'
import "jsuites/dist/jsuites.js"
import "jsuites/dist/jsuites.css"
import "jspreadsheet-ce/dist/jspreadsheet.css"
import jspreadsheet from "jspreadsheet"
import "@/../node_modules/jspreadsheet/dist/jspreadsheet.css"
import fetch from "@/json/fetch"

export default ((props, ref) => {

    // todo:: for test
    props = fetch

    // todo:: for test
    props.setMessage = () => {
        console.log('set message!')
    }

    // ライセンス
    jspreadsheet.setLicense('OGI5NWUwNTZjOWNjMzk5MDdmNDU4ODU3YzU4YzcxZjk2ZjA4ZDNkYjk0YjJmNzhmMDdmMTMzZDc4MmVhMDQ0MzBiMWMwZDE1YjM4ZWE1MTgwZDAwOTgxY2FkMTliZTdhMTQxY2YwZWM4YTk4Yzk1ZjQ1OGI1MDM0NWU5MTIxN2UsZXlKdVlXMWxJam9pYTI5b1pXa2lMQ0prWVhSbElqb3hOamMzT0RBeE5qQXdMQ0prYjIxaGFXNGlPbHNpSWl3aWJHOWpZV3hvYjNOMElsMHNJbkJzWVc0aU9qQXNJbk5qYjNCbElqcGJJblkzSWl3aWRqZ2lMQ0oyT1NKZGZRPT0=')

    // スプレッドシートの要素
    const jRef = useRef(null)

    // スプレッドシートの設定
    let options = {
        worksheets: [{
            ...props.options,
            pagination: 6,
            // 列のドラッグ
            columnDrag: false,
            // 列の並べ替えを
            // columnSorting: false,
            // Enter キーを使用して新しい列を追加
            allowInsertColumn: false,
        }],
    }

    // フックエフェクト
    useEffect(() => {
        if (!jRef.current.jspreadsheet) {
            jspreadsheet(jRef.current, options)
        }
    }, [options, props])

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons" />
            <div className="test7-wrapper">
                <div className='test7-table' ref={jRef} />
            </div>
        </>
    )
})