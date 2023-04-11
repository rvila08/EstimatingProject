import React, { useState } from "react";
import Dropzone from "react-dropzone";
import logo from "./cloudupload.png";

const FileUploader = ({ onFilesChange }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );
    setFiles([...files, ...newFiles]);
    onFilesChange([...files, ...newFiles]);
  };

  let handleRemove = (fileToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove));
    onFilesChange((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
  };

  const renderDropbox = () => {
    if (files.length === 0) {
      return (
        <Dropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div className="dropbox" {...getRootProps()}>
              <input {...getInputProps({ multiple: true })} />
              <p>Drag and drop files here, or click to select files</p>
              <img src={logo} alt="" />
            </div>
          )}
        </Dropzone>
      );
    } else {
      return (
        <div>
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="newDropbox" {...getRootProps()}>
                <input {...getInputProps({ multiple: true })} />
                <div className="thumbnails">
                  {files.map(
                    (file) =>
                      file.type &&
                      file.type.startsWith("image/") && (
                        <div className="thumbnail-container" key={file.name}>
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="thumbnail"
                          />
                        </div>
                      )
                  )}
                </div>
              </div>
            )}
          </Dropzone>
          {files.length > 0 && (
            <div className="file-list">
              <h3>Uploaded Files:</h3>
              {files.map((file) => (
                <div key={file.name} className="file-item">
                  <p>{file.name}</p>
                  <p>{file.size} bytes</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(file)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
  };

  return <div>{renderDropbox()}</div>;
};

export default FileUploader;
