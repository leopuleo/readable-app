const api = "http://localhost:3001";
let token = localStorage.token;

if(!token) {
  token = localStorage.token = Math.random().toString(36).substring(-8);
}
const headers = new Headers({
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
})

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getSinglePost = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const getSinglePostComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const sendNewPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
  }).then(res => res.json())

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      'title': post.title,
      'body': post.body
    })
  }).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res.json())
    .then(data => data)

export const updateVotesPost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json())

export const sendNewComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res.json())
    .then(data => data)

export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      'body': comment.body
    })
  }).then(res => res.json())

export const updateVotesComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      option: vote
    })
  }).then(res => res.json())
