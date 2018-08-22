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