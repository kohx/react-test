import React from 'react'
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

root.render(
    // ルータを追加
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)