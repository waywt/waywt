import axios from 'axios';

export const authSignup = newUser => {
  return axios.post('/auth/signup', newUser);
}

export const authVerify = (accessToken) => {
  return axios.get('/auth/user', {
    'headers': { 'Authorization': `Bearer ${accessToken}` }
  });
}