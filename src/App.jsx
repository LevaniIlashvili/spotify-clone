import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import PlaylistPage from "./pages/PlaylistPage";
import Navbar from "./components/Navbar";
import TrackPage from "./pages/TrackPage";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import SearchPage from "./pages/SearchPage";
import CreatePlaylistModal from "./components/playlistModal/CreatePlaylistModal";
import EditPlaylistModal from "./components/playlistModal/EditPlaylistModal";

const App = () => {
  const {
    setAccessToken,
    accessToken,
    setUser,
    user,
    setUserPlaylists,
    setUserLikedSongs,
    setCurrentTrack,
    isSidebarOpen,
  } = useGlobalContext();

  useEffect(() => {
    if (!window.location.hash) return;
    const newAccessToken = window.location.hash.split("=")[1].split("&")[0];
    setAccessToken(newAccessToken);
    window.history.replaceState({}, "http://localhost:5173/", "/");
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    setUser();
    setUserPlaylists();
    setUserLikedSongs();
    setCurrentTrack();
  }, [accessToken]);

  if (!user) {
    return (
      <div>
        <LoginPage />
      </div>
    );
  }

  return (
    <Wrapper
      style={{ gridTemplateColumns: isSidebarOpen ? "3fr 7fr" : "8rem 1fr" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <Router>
        <Navbar />
        <Sidebar />
        <CreatePlaylistModal />
        <EditPlaylistModal />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/track/:id" element={<TrackPage />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:searchQuery" element={<SearchPage />} />
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
        <MusicPlayer />
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 6.4rem 1fr;
`;

export default App;
