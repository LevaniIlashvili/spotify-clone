import { useGlobalContext } from "../../context";
import { useState } from "react";
import axios from "axios";
import PlaylistModal from "./PlaylistModal";

const CreatePlaylistModal = () => {
  const {
    accessToken,
    isCreatePlaylistModalOpen,
    setIsCreatePlaylistModalOpen,
    user,
    userPlaylists,
    setUserPlaylists,
  } = useGlobalContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createPlaylist = async () => {
    try {
      const response = await axios.post(
        `https://api.spotify.com/v1/users/${user.id}/playlists`,
        {
          name,
          description,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setUserPlaylists([response.data, ...userPlaylists]);
      setIsCreatePlaylistModalOpen(false);
      setName("");
      setDescription("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlaylistModal
      isModalOpen={isCreatePlaylistModalOpen}
      closeModal={() => setIsCreatePlaylistModalOpen(false)}
      modalHeader="Create a playlist"
      modalBtnText="Create"
      name={name}
      description={description}
      setName={setName}
      setDescription={setDescription}
      handleSubmit={createPlaylist}
    />
  );
};

export default CreatePlaylistModal;
