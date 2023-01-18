import React, { useState, useEffect, createContext } from 'react'
import { createRoot } from 'react-dom/client'

// Appコンポーネントをインポート
import App from '@/App'

// ルータを追加
import { BrowserRouter } from 'react-router-dom'

// css
import '@/css/App.css'
import '@/css/Sanitize.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

// Providerをインポート
import { Provider } from "react-redux"

// storeをインポート
import store from '@/store/index'

root.render(
    // ルータを追加
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
)