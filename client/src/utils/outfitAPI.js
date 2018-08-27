import axios from 'axios';

export const getOutfitDetails = id => {
  return axios.get(`/api/outfits/${id}`);
}