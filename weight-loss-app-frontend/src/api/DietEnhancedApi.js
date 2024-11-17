import { mainApi } from './MainApi';

const WeightLossEnhancedApi = () => {
  mainApi.enhanceEndpoints({
    endpoints: {
      addWeight: {
        invalidatesTags: [{ type: 'Progress',id: 'LIST' }],
      },
      getProgress: {
        providesTags: [{ type: 'Progress', id: 'LIST' }], 
      },
    },
  });
};

export default WeightLossEnhancedApi;
