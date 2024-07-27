import { ApiSlice } from "..";
const authSlice = ApiSlice.enhanceEndpoints({
  addTagTypes: ["Appointments"],
}).injectEndpoints({
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
        body,
      }),
    }),
    createAppointMent: builder.mutation({
      query: (body) => ({
        url: "user/book-appointment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments"],
    }),
    cancelAppointMent: builder.mutation({
      query: (body) => ({
        url: "user/cancel-appointment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Appointments"],
    }),
    getAllPatient: builder.query({
      query: () => ({
        url: "user/patients",
        method: "GET",
      }),
    }),
    getAllApointment: builder.query({
      query: () => ({
        url: "user/appointments",
        method: "GET",
      }),
      providesTags: ["Appointments"],
    }),
    getPhysician: builder.query({
      query: () => ({
        url: "user/physicians",
        method: "GET",
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
  useUploadImageMutation,
  useCreateAppointMentMutation,
  useCancelAppointMentMutation,
  useGetAllApointmentQuery,
  useGetAllPatientQuery,
  useGetPhysicianQuery,
} = authSlice;
