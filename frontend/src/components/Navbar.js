import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";
import "./Navbar.css";

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const { setResultOffset } = useContext(MusicContext);
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-music-note-list mx-2"></i>Spotify Like
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex w-100 justify-content-center">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="btn btn-outline-success"
            >
              Search
            </button>
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Removed the Like and Pin buttons */}
            <li className="nav-item">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className="btn btn-outline-success btn-sm mx-1"
                >
                  <i className="bi bi-pin-angle-fill"></i> {pinnedMusic.length}
                </button>
              </li>
              <li className="nav-item">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#likedMusicModal"
                  className="btn btn-outline-success btn-sm mx-1"
                >
                  <i className="bi bi-heart-fill"></i> {likedMusic.length}
                </button>
              </li>
          </ul>
        </div>
      </div>
    </nav>
    <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
</>
    
  );
};

export default Navbar;
