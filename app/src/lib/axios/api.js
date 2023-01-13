import { axios } from '@/lib/axios/axios'

export default {

  getPosts(page = 1, limit = 5) {

    const start = limit * (page - 1)

    const url = `/posts/`

    const data = {
      params: {
        _start: start,
        _limit: limit,
      }
    }

    return axios.get(url, data)
  },

  getPost(postId) {
    const url = `/posts/${postId}`
    const data = {
      params: {
      }
    }
    return axios.get(url, data)
  }
}