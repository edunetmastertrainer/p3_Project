import React, { useState } from "react";
import "./AddSong.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddSong = () => {
  const [image, setImage] = useState(null);  // Initialize as null
  const [url, setUrl] = useState(null);      // Initialize as null
  const [songDetails, setSongDetails] = useState({
    songname: "",
    singer: "",
    albumname: "",
    releaseyear: "",
  });

  const AddSong = async () => {
    // Check if both image and audio files are selected
    if (!image || !url) {
      alert("Please select both an image and a song file.");
      return;
    }

    // Create a FormData object
    let formData = new FormData();

    // Append song details and files
    formData.append("songImage", image);  // songImage for image file
    formData.append("songaudio", url);    // songaudio for audio file

    formData.append("name", songDetails.songname);
    formData.append("singer", songDetails.singer);
    formData.append("albumname", songDetails.albumname);
    formData.append("releaseyear", songDetails.releaseyear);

    try {
      // Make the request to the backend to upload the song (image + audio)
      const response = await fetch(`${backend_url}/upload`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      const data = await response.json();

      // If upload is successful
      if (data.success) {
        alert("Song uploaded successfully!");
      } else {
        alert("Failed to upload song.");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      alert("An error occurred while uploading the song.");
    }
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setSongDetails({ ...songDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Song Name</p>
        <input
          type="text"
          name="songname"
          value={songDetails.songname}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-itemfield">
        <p>Singer Names</p>
        <input
          type="text"
          name="singer"
          value={songDetails.singer}
          onChange={changeHandler}
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Album Name</p>
          <input
            type="text"
            name="albumname"
            value={songDetails.albumname}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Release Year</p>
          <input
            type="number"
            name="releaseyear"
            value={songDetails.releaseyear}
            onChange={changeHandler}
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Album image</p>
        <label htmlFor="file-input">
          <img
            className="addproduct-thumbnail-img"
            src={image ? URL.createObjectURL(image) : upload_area}
            alt="Upload"
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="songImage"  // Field name to match backend
          id="file-input"
          accept="image/*"
          hidden
        />
        <p>Song</p>
        <label htmlFor="file-input1">
          <img
            className="addproduct-thumbnail-imgaudio"
            src={url ? URL.createObjectURL(url) : upload_area}
            alt="Upload"
          />
        </label>
        <input
          onChange={(e) => setUrl(e.target.files[0])}
          type="file"
          name="songaudio"  // Field name to match backend
          id="file-input1"
          accept="audio/*"
          hidden
        />
      </div>
      <button className="addproduct-btn" onClick={AddSong}>
        ADD
      </button>
    </div>
  );
};

export default AddSong;
