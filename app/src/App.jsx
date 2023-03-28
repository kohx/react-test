import React, { useState, createContext } from 'react'

// ルータを追加
import { Routes, Route } from 'react-router-dom'

//　ルートコンポネントを追加
import Home from '@/routes/Home'
import About from '@/routes/About'
import Contact from '@/routes/Contact'
import Posts from '@/routes/Posts'
import Post from '@/routes/Post'
import Test1 from '@/routes/Test1'
import Test2 from '@/routes/Test2'
import Test3 from '@/routes/Test3'
import Test4 from '@/routes/Test4'
import Test5 from '@/routes/Test5'
import Test6 from '@/routes/Test6'
import Test7 from '@/routes/Test7'
import Test8 from '@/routes/Test8'
import Test9 from '@/routes/Test9'
import Test10 from '@/routes/Test10'
import Test11 from '@/routes/Test11'
import Test12 from '@/routes/Test12'
import NotFound from '@/routes/NotFound'

//　ナビのコンポネントを追加
import Navbar from '@/components/Navbar'

// Redux:
import Async from '@/components/redux/Async'

export default () => {

  return (
    <div className="App">
      <Async />
      <Navbar />
      
      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/posts" element={<Posts />}>
          <Route path=":postId" element={<Post />} />
        </Route>
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route path="/test3" element={<Test3 />} />
        <Route path="/test4" element={<Test4 />} />
        <Route path="/test5" element={<Test5 />} />
        <Route path="/test6" element={<Test6 />} />
        <Route path="/test7" element={<Test7 />} />
        <Route path="/test8" element={<Test8 />} />
        <Route path="/test9" element={<Test9 />} />
        <Route path="/test10" element={<Test10 />} />
        <Route path="/Test11" element={<Test11 />} />
        <Route path="/Test12" element={<Test12 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}