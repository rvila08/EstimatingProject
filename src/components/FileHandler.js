import React from "react";
import Dropzone from "react-dropzone";
import { useState } from "react";
import logo from "./cloudupload.png";

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  let handleDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  };

  return (
    <div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div class="dropbox" {...getRootProps()}>
            <input {...getInputProps({ multiple: true })} />
            <p>Drag and drop files here, or click to select files</p>
            <img src={logo} alt="" />
          </div>
        )}
      </Dropzone>
      {files.length > 0 && (
        <div style={{ maxHeight: "200px", overflowY: "auto" }}>
          <h3>Uploaded Files:</h3>
          <ul>
            {files.map((file) => (
              <li key={file.name}>
                {file.name} - {file.size} bytes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
