const api = "http://localhost:3001";
let token = localStorage.token;

if(!token) {
  token = localStorage.token = Math.random().toString(36).substring(-8);
}
const headers = {
  'Accept': 'Application/json',
  'Authorization': token,
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data)


export const getPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)
