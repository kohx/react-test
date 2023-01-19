import React, { useState, useEffect, createContext } from 'react'

// ルータを追加
import { Routes, Route } from 'react-router-dom'

//　ルートコンポネントを追加
import Home from '@/routes/Home'
import About from '@/routes/About'
import Contact from '@/routes/Contact'
import Posts from '@/routes/Posts'
import Post from '@/routes/Post'
import NotFound from '@/routes/NotFound'

//　ナビのコンポネントを追加
import Navbar from '@/components/Navbar'

// content:
import ContentA from '@/components/contentA/ContentA'

// reducer:
import Counter from '@/components/reducer/Counter'

// Redux:
import GetState from '@/components/redux/GetState'
import ConnectAndMapStateToProps from '@/components/redux/ConnectAndMapStateToProps'
import UseSelectorHooks from '@/components/redux/UseSelectorHooks'
import Async from '@/components/redux/Async'

// content: useContextを使用してpropsを利用することなく異なる階層のコンポーネントとデータの共有
export const TestValue = createContext()

// content: useContextをstateで使用する
export const TestCount = createContext()

export default () => {

  // content: ステートでわたす
  const [count, setCount] = useState(10)
  const value = {
    count,
    setCount,
  };

  return (
    <div className="App">

      <Async />

      <Navbar />

      <Counter />

      {/* 渡す側をProvider */}
      <TestValue.Provider value={100}>
        <TestCount.Provider value={value}>
          {count}
          <ContentA />
        </TestCount.Provider>
      </TestValue.Provider>

      <br />
      <GetState />
      <br />
      <ConnectAndMapStateToProps />
      <br />
      <UseSelectorHooks />

      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}