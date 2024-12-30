import { createContext, useState, useEffect } from "react";

// AuthContext for handling authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// MusicContext for handling music-related state
export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likedMusic, setLikedMusic] = useState(
    JSON.parse(localStorage.getItem("likedMusic")) || []
  );
  const [pinnedMusic, setPinnedMusic] = useState(
    JSON.parse(localStorage.getItem("pinnedMusic")) || []
  );
  const [resultOffset, setResultOffset] = useState(0);

  useEffect(() => {
    localStorage.setItem("likedMusic", JSON.stringify(likedMusic));  // Sync with localStorage
  }, [likedMusic]);

  useEffect(() => {
    localStorage.setItem("pinnedMusic", JSON.stringify(pinnedMusic)); // Sync with localStorage
  }, [pinnedMusic]);

  return (
    <MusicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        likedMusic,
        setLikedMusic,
        resultOffset,
        setResultOffset,
        pinnedMusic,
        setPinnedMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

// Combined ContextProvider to wrap the whole app
export const CombinedProvider = ({ children }) => {
  return (
    <AuthProvider>
      <MusicProvider>
        {children}
      </MusicProvider>
    </AuthProvider>
  );
};
