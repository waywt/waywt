import axios from 'axios';

export const authSignup = newUser => {
  return axios.post('/auth/signup', newUser);
}

export const authLogin = user => {
  return axios.post('/auth/login', user);
}

export const authVerify = () => {
  return axios.get('/auth/user', {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}

export const userFeed = () => {
  return axios.get('/api/users/feed', {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}

export const userInfo = (username) => {
  return axios.get(`/api/users/${username}`);
}

export const userFollow = (id) => {
  return axios.post(`/api/users/${id}/follow`, {}, {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}

export const userUnfollow = (id) => {
  return axios.post(`/api/users/${id}/unfollow`, {}, {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}

export const userOutfits = (id, qs) => {
  return axios.get(`/api/users/${id}/outfits${qs}`);
}

export const userTagged = (id, qs) => {
  return axios.get(`/api/users/${id}/tagged${qs}`);
}

export const userFollowers = (id, qs) => {
  return axios.get(`/api/users/${id}/followers${qs}`);
}

export const userFollowing = (id, qs) => {
  return axios.get(`/api/users/${id}/following${qs}`);
}

export const outfitsFollowing = (qs) => {
  return axios.get(`/api/outfits/following${qs}`, {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}

export const createOutfit = newOutfitWithTags => {
  return axios.post('/api/outfits', newOutfitWithTags, {
    'headers': { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  });
}