import { axios } from '@/lib/axios/axios'

export default {

  getPosts(page = 1, limit = 10) {

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
  },

  getUser(userId) {
    // const url = `http://localhost:3000/json/test.json`
    const url = `/users/${userId}`
    const data = {
      params: {
      }
    }
    return axios.get(url, data)

    // * redux-thunk
    // return async (dispatch) => {
    //   const url = `/users/${userId}`
    //   const { status, data } = await axios.get(url)

    //   dispatch({
    //     type: 'GET_POST_DATA',
    //     payload: data,
    //   });
    // }
  }
}