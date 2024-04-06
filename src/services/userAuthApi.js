import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/user/" }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: "register/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: "login/",
          method: "POST",
          body: user,
          headers: {
            "Content-type": "application/json",
          },
        };
      },
    }),
    getUserData: builder.query({
        query: (access_token) => {
          return {
            url: "profile/",
            method: "GET",
            headers: {
              "Authorization": `Bearer ${access_token}`,
            },
          };
        },
      }),
      changeUserPassword: builder.mutation({
        query: ({ actualData, access_token }) => {
          return {
            url: 'change-password/',
            method: 'POST',
            body: actualData,
            headers: {
              'authorization': `Bearer ${access_token}`,
            }
          }
        }
      }),
      sendResetPassEmail: builder.mutation({
        query: (actualData) => {
          return {
            url: 'send-resetpass-email/',
            method: 'POST',
            body: actualData,
            headers: {
              "Content-type": "application/json",
            }
          }
        }
      }),
      resetUserPassword: builder.mutation({
        query: ({actualData, id, token}) => {
          return {
            url: `reset-password/${id}/${token}/`,
            method: 'POST',
            body: actualData,
            headers: {
              "Content-type": "application/json",
            }
          }
        }
      }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation, useGetUserDataQuery, useChangeUserPasswordMutation, useSendResetPassEmailMutation, useResetUserPasswordMutation } = userAuthApi;
