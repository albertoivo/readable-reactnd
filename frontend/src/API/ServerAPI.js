const URL_API = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllPosts = () =>
  fetch(`${URL_API}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getAllCategories = () =>
  fetch(`${URL_API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)