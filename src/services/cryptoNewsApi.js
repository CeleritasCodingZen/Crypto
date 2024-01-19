import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': '350c83824dmsh882a13f66a78478p1a4a89jsn867851458201',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com',
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com/v1/coindesk';

const createRequest = () => ({ url: baseUrl, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => createRequest(),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
