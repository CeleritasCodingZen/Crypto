import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders={
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '350c83824dmsh882a13f66a78478p1a4a89jsn867851458201',
}

const baseUrl ='https://coinranking1.p.rapidapi.com';



const createRequest =(url)=>({url,headers: cryptoApiHeaders})

export const cryptoApi= createApi({

    reducerPath:'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints:(builder)=>({

        getCryptos:builder.query({
          query: (count) => createRequest(`/coins?limit=${count}`),
        }),
        getCryptoDetails:builder.query({
          query:(coinId)=>createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
        }),
        getExchanges: builder.query({
          query: () => createRequest('/exchanges'),
        }),

    }),

});

export const{
   useGetCryptosQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery, useGetExchangesQuery,
}=cryptoApi;









// const axios = require('axios');

/* const options = {
  method: 'GET',
  url: 'https://coinranking1.p.rapidapi.com/coins',
  params: {
    referenceCurrencyUuid: 'yhjMzLPhuIDl',
    timePeriod: '24h',
    'tiers[0]': '1',
    orderBy: 'marketCap',
    orderDirection: 'desc',
    limit: '50',
    offset: '0'
  },
  headers: {
    'X-RapidAPI-Key': '350c83824dmsh882a13f66a78478p1a4a89jsn867851458201',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
  }
}; */

// The code within the /* */ block is now commented out.
