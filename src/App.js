import Fields from "./components/Fields";
import "./components/FileHandler";
import "./styles.css";
import FileUploader2 from "./components/FileHandler2";
import { useState } from "react";
import axios from "axios";

export default function App() {
  const [carInfo, setCarInfo] = useState({});
  const [files, setFiles] = useState([]);

  const handleCarInfoChange = (newInfo) => {
    setCarInfo({ ...carInfo, ...newInfo });
  };

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    // Send `carInfo` and `files` to the database
    e.preventDefault();

    const formData = new FormData();
    formData.append("carInfo", JSON.stringify(carInfo));

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setCarInfo({});
    setFiles([]);
  };

  return (
    <div className="App">
      <h1>FixIt</h1>
      <h2>Car Information</h2>
      <Fields onCarInfoChange={handleCarInfoChange} />
      <FileUploader2 onFilesChange={handleFilesChange} />
      <button className="MyButton" onClick={handleSubmit}>
        {" "}
        Submit{" "}
      </button>
      <div className="Test"> car: {JSON.stringify(carInfo)} </div>
      <div> files:{JSON.stringify({ files })} </div>
    </div>
  );
}
