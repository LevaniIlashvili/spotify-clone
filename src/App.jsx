import { useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import { useGlobalContext } from "./context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MusicPlayer from "./components/musicPlayer/MusicPlayer";
import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Playlist from "./components/Playlist";

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
        <Login />
      </div>
    );
  }

  return (
    <Wrapper
      style={{ gridTemplateColumns: isSidebarOpen ? "3fr 7fr" : "8rem 1fr" }}
    >
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          {/* <Route path="*" element={<Home />} /> */}
        </Routes>
        <MusicPlayer />
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
`;

export default App;
