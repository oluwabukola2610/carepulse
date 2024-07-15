// "use client";

// import Image from "next/image";
// import React, { useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// import { convertFileToUrl } from "@/lib/utils";

// type FileUploaderProps = {
//   files: File[] | undefined;
//   onChange: (files: File[]) => void;
// };

// export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     onChange(acceptedFiles);
//   }, []);

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()} className="file-upload">
//       <input {...getInputProps()} />
//       {files && files?.length > 0 ? (
//         <Image
//           src={convertFileToUrl(files[0])}
//           width={1000}
//           height={1000}
//           alt="uploaded image"
//           className="max-h-[400px] overflow-hidden object-cover"
//         />
//       ) : (
//         <>
//           <Image
//             src="/assets/icons/upload.svg"
//             width={40}
//             height={40}
//             alt="upload"
//           />
//           <div className="file-upload_label">
//             <p className="text-14-regular ">
//               <span className="text-green-500">Click to upload </span>
//               or drag and drop
//             </p>
//             <p className="text-12-regular">
//               SVG, PNG, JPG or GIF (max. 800x400px)
//             </p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface FileUploaderProps {
  files: File[] | undefined;
  onChange: (file: File) => void;
  previewUrl: string | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onChange,
  previewUrl,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onChange(acceptedFiles[0]);
    }
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {previewUrl ? (
        <Image
          src={previewUrl}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="upload"
          />
          <div className="file-upload_label">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
