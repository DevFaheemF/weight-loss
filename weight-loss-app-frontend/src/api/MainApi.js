import { createApi } from '@reduxjs/toolkit/query/react';
import { createBaseQuery } from './ApiHead';

const baseQuery = createBaseQuery();

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: baseQuery,
  tagTypes: ['Weight', 'List', 'Progress'],
  endpoints: () => ({}),
});
