import fetch from 'isomorphic-fetch'
import sortBy from 'sort-by'

const URL_API = 'http://localhost:3001'

let token = localStorage.token
if (!token) {
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8)
}

const headers = {
  Accept: 'application/json',
  Authorization: token
}

export const getAllPosts = () =>
  fetch(`${URL_API}/posts`, { headers })
    .then(res => res.json())

export const getPopularPosts = (qty) =>
  fetch(`${URL_API}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.sort(sortBy('-voteScore')).slice(0, qty ? qty : 5))

export const getPostById = postId =>
  fetch(`${URL_API}/posts/${postId}`, { headers })
    .then(res => res.json())

export const getCommentsByPost = postId =>
  fetch(`${URL_API}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

export const getPostsByCategory = categoryPath =>
  fetch(`${URL_API}/${categoryPath}/posts`, { headers })
    .then(res => res.json())

export const getAllCategories = () =>
  fetch(`${URL_API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const addCommentPost = (cId, body, author, postId) =>
  fetch(`${URL_API}/comments?id=${cId}&timestamp=${Date.now}&body=${body}&author=${author}&parentId=${postId}`)
    .then(res => res.json())