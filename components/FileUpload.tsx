"use client";
import Image from "next/image";
import { X } from "lucide-react"
import React from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { error } from "console";

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  // extract the file type of the uploaded file from the value
  const fileType = value?.split(".").pop()
  if(value && fileType !== "pdf"){
    return (
      <div className="relative h-20 w-20">
        <Image 
          src={value}
          fill
          alt="server image"
          className="rounded-full"
        />
        <button 
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button">
          <X className="h-4 w-4"/>
        </button>
      </div>
    )
  }


  return(
    <UploadDropzone 
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            console.log(error)
        }}
    />
  )
};

export default FileUpload;
