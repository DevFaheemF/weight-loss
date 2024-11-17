import { mainApi } from './MainApi'
import WeightLossEnhancedApi from './DietEnhancedApi';

const dietApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({
      addWeight: builder.mutation({
        query: (newDieter) => ({
          url: '/add',
          method: 'POST',
          body: newDieter,
        }),
        invalidatesTags: [{ type: 'Weight', id: 'LIST' }],
      }),
      getProgress: builder.query({
        query: () => '/progress',
        providesTags: [{ type: 'Progress', id: 'LIST' }],
      }),
    }),
    overrideExisting: true, 
  });
WeightLossEnhancedApi();

export const { useAddWeightMutation, useGetProgressQuery } = dietApi;
