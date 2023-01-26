import React from 'react'

// component
const AdminDashboard = () => <h3>管理者用ダッシュボード</h3>

// component
const Dashboard = () => <h3>ユーザ用ダッシュボード</h3>

const AdminSubBoard = () => <h4>管理者用サブボード</h4>;
const SubBoard = () => <h4>ユーザ用サブボード</h4>;

// component
export default () => {

    const user = {
        // admin: true,
        admin: false,
        name: 'John',
    }

    let dashboard = null
    if (user.admin) {
        dashboard = <AdminDashboard />
    } else {
        dashboard = <Dashboard />
    }

    const subBoard = user.admin ? <AdminSubBoard /> : <SubBoard />

    return (
        <>
            {dashboard}
            {subBoard}
            {user.admin && <p>あなたは管理者です。</p>}
            {user.admin || <p>あなたは管理者ではありません。</p>}
        </>
    )
}
