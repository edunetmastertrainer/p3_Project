import { useContext, useEffect, useState, useRef } from 'react';
import Card from './Card';
import CreatePlaylist from './CreatePlaylist';
import { initializePlaylist } from '../initialize';
import Navbar from './Navbar';
import { MusicContext } from '../Context';
import './Home.css';

function Home() {
  const [keyword, setKeyword] = useState('');
  const [message, setMessage] = useState('');
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]); // State to hold filtered tracks
  const [hasSearched, setHasSearched] = useState(false);

  const {
    isLoading,
    setIsLoading,
    setLikedMusic,
    setPinnedMusic,
    resultOffset,
    setResultOffset,
  } = useContext(MusicContext);

  const resultOffsetRef = useRef(resultOffset);
  resultOffsetRef.current = resultOffset;

  const fetchMusicData = async (offset = 0) => {
    setTracks([]); // Clear existing tracks
    setMessage(''); // Clear any previous message
    window.scrollTo(0, 0); // Scroll to the top of the page
    setIsLoading(true); // Set loading state

    try {
      const response = await fetch(`http://localhost:5001/songs`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch music data: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log('Fetched songs:', jsonData); // Debug log backend response

      if (jsonData.length === 0) {
        setMessage('No songs found.');
      } else {
        setTracks(jsonData.slice(offset, offset + 10)); // Adjust based on backend response
        setFilteredTracks(jsonData.slice(offset, offset + 10)); // Initialize filtered tracks
      }
    } catch (error) {
      setMessage('We couldn’t retrieve the music data. Please try again.');
      console.error('Error fetching music data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tracks based on the keyword
  useEffect(() => {
    if (keyword.trim() === '') {
      setFilteredTracks(tracks); // If no keyword, show all tracks
    } else {
      setFilteredTracks(
        tracks.filter((track) =>
          track.songname.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }
  }, [keyword, tracks]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setResultOffset(0);
      fetchMusicData(0);
    }
  };

  const handleSearchClick = () => {
    if (!keyword.trim()) {
      setMessage('Please enter a search term');
      return;
    }
    setResultOffset(0);
    fetchMusicData(0);
  };

  useEffect(() => {
    initializePlaylist();
    fetchMusicData(); // Initial fetch for the homepage
    setLikedMusic(JSON.parse(localStorage.getItem('likedMusic')) || []);
    setPinnedMusic(JSON.parse(localStorage.getItem('pinnedMusic')) || []);
  }, [setLikedMusic, setPinnedMusic]);

  useEffect(() => {
    if (!hasSearched) {
      fetchMusicData();
      setHasSearched(true);
    }
  }, [hasSearched]);

  const [currentAudio, setCurrentAudio] = useState(null);

  const playSong = (track) => {
    const audioUrl = `http://localhost:5001${track.url}`; // Use correct URL from track
    if (currentAudio) {
      currentAudio.pause(); // Stop any currently playing audio
    }
    const audio = new Audio(audioUrl);
    audio.play();
    setCurrentAudio(audio);
    console.log(`Playing song: ${track.songname}, URL: ${audioUrl}`);
  };

  return (
    <>
      <Navbar
        keyword={keyword}
        setKeyword={setKeyword}
        handleKeyPress={handleKeyPress}
        fetchMusicData={handleSearchClick}
      />

      <div className="container">
        <div className={`row ${isLoading ? '' : 'd-none'}`}>
          <div className="col-12 py-5 text-center">
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem' }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div className={`row ${message ? '' : 'd-none'}`}>
          <div className="col-12 py-2 text-center">
            <h4 className="text-center text-danger">{message}</h4>
          </div>
        </div>
        <div className="row">
          {filteredTracks.length > 0 ? (
            filteredTracks.map((element) => (
              <Card key={element._id || `${element.songname}-${element.singer}`} element={element}>
                <img
                  src={`http://localhost:5001${element.image || '/placeholder.png'}`} // Fallback to placeholder
                  alt={element.singer || 'Unknown Artist'} // Fallback for singer
                  className="img-fluid"
                />
                <h5>{element.songname || 'Unknown Song'}</h5> {/* Fallback for song name */}
                <p>{`Artist: ${element.singer || 'Unknown Artist'}`}</p> {/* Fallback for artist */}
                <p>{`Release date: ${element.releaseDate || 'Unknown Date'}`}</p> {/* Fallback for release date */}
                <button
                  onClick={() => playSong(element)}
                  className="btn btn-primary mt-2"
                >
                  Play
                </button>
              </Card>
            ))
          ) : (
            <div className="col-12 text-center">
              <p>No tracks available. Please perform a search.</p>
            </div>
          )}
        </div>
        {filteredTracks.length > 0 && (
          <div className="row">
            <div className="col">
              <button
                onClick={() => {
                  setResultOffset((previous) => Math.max(previous - 10, 0));
                  fetchMusicData(resultOffsetRef.current - 10);
                }}
                className="btn btn-outline-success w-100"
                disabled={resultOffsetRef.current === 0}
              >
                Previous Page
              </button>
            </div>
            <div className="col">
              <button
                onClick={() => {
                  setResultOffset((previous) => previous + 10);
                  fetchMusicData(resultOffsetRef.current + 10);
                }}
                className="btn btn-outline-success w-100"
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
