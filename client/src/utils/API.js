import axios from 'axios';

export const authSignup = newUser => {
  return axios.post('/auth/signup', newUser);
}
