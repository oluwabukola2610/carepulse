// "use server";
// import { databases, storage, users } from "../../lib/appwrite";
// import { ID, Query } from "node-appwrite";
// import { parseStringify } from "../../lib/utils";

import { ApiSlice } from "..";

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     const response = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       undefined,
//       user.name
//     );
//     return response;
//   } catch (error: any) {
//     if (error && error.code === 409) {
//       const documents = await users.list([Query.equal("email", user.email)]);
//       return documents.users[0];
//     } else {
//       console.error("Error creating user:", error);
//     }
//   }
// };

// export const getUser = async (userId: string) => {
//   try {
//     const user = await users.get(userId);
//     return parseStringify(user);
//   } catch (error) {
//     console.error(
//       "An error occurred while retrieving the user details:",
//       error
//     );
//   }
// };
// // REGISTER PATIENT
// export const registerPatient = async ({
//   identificationDocument,
//   ...patient
// }: RegisterUserParams) => {
//   try {
//     // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
//     let file;
//     if (identificationDocument) {
//       const blobFile = identificationDocument.get("blobFile") as Blob;
//       const fileName = identificationDocument.get("fileName") as string;

//       const inputFile = new File([blobFile], fileName, { type: blobFile.type });

//       file = await storage.createFile(
//         process.env.NEXT_PUBLIC_STORAGE_ID as string,
//         ID.unique(),
//         inputFile
//       );
//     }

//     // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
//     const newPatient = await databases.createDocument(
//       process.env.NEXT_PUBLIC_DATABASE_ID as string,
//       process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!,
//       ID.unique(),
//       {
//         identificationDocumentId: file?.$id ? file.$id : null,
//         identificationDocumentUrl: file?.$id
//           ? `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_STORAGE_ID}/files/${file.$id}/view??project=${process.env.NEXT_PUBLIC_PROJECT_ID}`
//           : null,
//         ...patient,
//       }
//     );

//     return parseStringify(newPatient);
//   } catch (error) {
//     console.error("An error occurred while creating a new patient:", error);
//   }
// };

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
} = authSlice;
