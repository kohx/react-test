import React from 'react';

// ルータを追加
import { Routes, Route } from 'react-router-dom';

//　ルートコンポネントを追加
import Home from '@/routes/Home';
import About from '@/routes/About';
import Contact from '@/routes/Contact';
import NotFound from '@/routes/NotFound';

//　ナビのコンポネントを追加
import Navbar from '@/components/Navbar';

export default () => {
  return (
    <div className="App">
      <Navbar />
      {/* `Routes`タグの中に`Route`タグでパストコンポネントを追加 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}