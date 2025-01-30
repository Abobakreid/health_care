"use client";
import { convertFileToUrl } from "@/lib/utils";
import { UploadFilesProps } from "@/types";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

function UploadFile({ files, onChange }: UploadFilesProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border border-input flex flex-col justify-center items-center rounded-lg py-4"
    >
      <input {...getInputProps()} />
      {files && files[0] ? (
        <div>
          <Image
            src={convertFileToUrl(files[0])}
            alt="Identification Image"
            width={20}
            height={20}
            className="object-contain aspect-square size-full"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center">
          <Image
            src="/assets/icons/upload.svg"
            alt="upload icon"
            width={20}
            height={20}
            className="object-contain w-10 h-10 mb-2"
          />
          <div>
            <p>Drag and Drop Some Files Here, or Click to Select Files</p>
            <p>SVG, PNG, JPG OR GIF</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default UploadFile;
