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

    // スプレッドシートの設定
    let options: any = {
        data: [],
        worksheets: [{
            ...props.options,
            minDimensions: [10, 20],
            tableOverflow: true,
            tableWidth: "600px",
            tableHeight: "400px",
            // pagination: 1000,
            // pagination: 20,
        }],
    }

    // フックエフェクト
    useEffect(() => {
        // 最初のレンダー
        if (!jRef.current.jspreadsheet) {

            // スプレッドシートの表示
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