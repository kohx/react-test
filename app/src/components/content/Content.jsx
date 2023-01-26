import React, { useState, createContext } from 'react'

// content:
import ContentA from '@/components/content/contentA/ContentA'

// content: expoer -> useContextを使用してpropsを利用することなく異なる階層のコンポーネントとデータの共有
export const TestValue = createContext()

// content: expoer -> useContextをstateで使用する
export const TestCount = createContext()

export default () => {

    // content: ステートでわたす
    const [count, setCount] = useState(10)
    const value = {
        count,
        setCount,
    }

    return (
        <div>
            {/* 渡す側をProvider */}
            <TestValue.Provider value={100}>
                <TestCount.Provider value={value}>
                    count up: {count}
                    <ContentA />
                </TestCount.Provider>
            </TestValue.Provider>
        </div>
    )
}