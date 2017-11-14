import { GET_ALL_POSTS, GET_POST } from '../actions/posts'

export const posts = (state = { items: [], item: '' }, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return Object.assign({}, state, {
        items: action.posts
      })
    case GET_POST:
      return Object.assign({}, state, {
        item: action.post
      })
    default:
      return state
  }
}
