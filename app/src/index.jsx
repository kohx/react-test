import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

// Appコンポーネントをインポート
import App from './App';

// ルータを追加
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    // ルータを追加
    <BrowserRouter>
        <App />
    </BrowserRouter>
);