import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENV } from '../config/config';
const { baseUrl } = ENV;

export const createBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });
};
