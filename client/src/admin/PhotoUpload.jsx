import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import newRequest from "../functions/newRequest";


const MAX_FILES = 6;

const PhotoUpload = () => {
  const [files, setFiles] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [titleExists, setTitleExists] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);

  useEffect(() => {
    if (validationComplete && !titleExists) {
      handleUpload();
    }else{
        setError("Nombre ya existe")
    }
  }, [validationComplete, titleExists]);

  const handleUpload = async () => {
    
    try {
      const formData = new FormData();
      formData.append("collectionName", collectionName);
      files.forEach((file) => formData.append("images", file));

      await newRequest.post("/pics/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFiles([]);
      setCollectionName("");
    } catch (err) {
      setError("Failed to upload files. Please try again later.", err);
    }
  };

  const handleDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.slice(0, MAX_FILES - prevFiles.length),
    ]);
  };

  const handleRemove = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleCollectionNameChange = (event) => {
    setCollectionName(event.target.value);
    setTitleExists(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUploading(true);

    try {
      const response = await newRequest.post("/pics/check", {
        title: collectionName,
      });
      setTitleExists(response.data.exists);
    } catch (error) {
      console.error(error);
    } finally {
      setValidationComplete(true);
    }

    setUploading(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
    disabled: uploading,
    multiple: true,
  });

  console.log(titleExists);
  console.log(error);

  return (
    <form onSubmit={handleSubmit} className="picSection">
      <div className="picForm">
        <label htmlFor="collectionName" className="text-xl font-bold mb-2">
          Titulo de la coleccion (Tenga en cuenta que solo se puede subir una
          coleccion con el mismo titulo):
        </label>
        <input
          type="text"
          id="collectionName"
          name="collectionName"
          value={collectionName}
          onChange={handleCollectionNameChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div
          {...getRootProps()}
          className="dropzone border border-gray-300 rounded-md p-4"
        >
          <input {...getInputProps()} />
          <p className="text-lg mb-4">Max 6 fotos por coleccion</p>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="mb-2">
                {file.name} ({Math.round(file.size / 1024)} KB)
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  disabled={uploading}
                  className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </form>
  );
};

export default PhotoUpload;
