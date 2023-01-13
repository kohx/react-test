import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: { 'X-Requested-With': 'XMLHttpRequest' },
    // withCredentials: true
})

axios.interceptors.request.use(config => {
    // something to do

    return config
})

axios.interceptors.response.use(
    response => {
        // 成功時の処理

        // レスポンス
        return response
    },
    error => {
        // 失敗時の処理

        // レスポンスの形をそろえる
        // エラー時に catch に入ってくる エラーオブジェクトは .response プロパティを持っていて、その中の response.data には API が send した内容が入っている
        const err = error.response || error

        // レスポンスの形をそろえる
        return err
    }
)

export {
    axios
}