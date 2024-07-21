import { ApiSlice } from "..";
const authSlice = ApiSlice.enhanceEndpoints({}).injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    Login: builder.mutation({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    ValidateLogincode: builder.mutation({
      query: (body) => ({
        url: "auth/login-code",
        method: "POST",
        body,
      }),
    }),

    validateOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/otp",
        method: "POST",
        body,
      }),
    }),
    getUserData: builder.query({
      query: () => ({
        url: "user/data",
        method: "GET",
      }),
    }),
    updateUserData: builder.mutation({
      query: (body) => ({
        url: "/user/update-bio",
        method: "PATCH",
        body,
      }),
    }),
    updatePatientdata: builder.mutation({
      query: (body) => ({
        url: "user/patientMedicalData",
        method: "POST",
        body,
      }),
    }),
    updatePhysiciandata: builder.mutation({
      query: (body) => ({
        url: "user/doctorMedicalData",
        method: "POST",
        body,
      }),
    }),
    uploadDocument: builder.mutation({
      query: (body) => ({
        url: "user/documentUpload",
        method: "POST",
        body,
      }),
    }),
    uploadImage: builder.mutation({
      query: (body) => ({
        url: "user/imageUpload",
        method: "POST",
        body
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useValidateLogincodeMutation,
  useValidateOtpMutation,
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
  useUpdateUserDataMutation,
  useUpdatePatientdataMutation,
  useUploadDocumentMutation,
  useUpdatePhysiciandataMutation,
  useUploadImageMutation
} = authSlice;
