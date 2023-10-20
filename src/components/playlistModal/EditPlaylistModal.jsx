import { useGlobalContext } from "../../context";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaylistModal from "./PlaylistModal";

const EditPlaylistModal = () => {
  const {
    accessToken,
    isEditPlaylistModalOpen,
    setIsEditPlaylistModalOpen,
    userPlaylists,
    setUserPlaylists,
  } = useGlobalContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isEditPlaylistModalOpen.playlist) return;
    setName(isEditPlaylistModalOpen.playlist.name);
    setDescription(isEditPlaylistModalOpen.playlist.description);
  }, [isEditPlaylistModalOpen]);

  const editPlaylist = async () => {
    try {
      const response = await axios.put(
        `https://api.spotify.com/v1/playlists/${isEditPlaylistModalOpen.playlist.id}`,
        {
          name,
          description: description ? description : undefined,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setUserPlaylists(
        [...userPlaylists].map((playlist) => {
          if (playlist.id === isEditPlaylistModalOpen.playlist.id) {
            playlist.name = name;
            playlist.description = description;
          }
          return playlist;
        })
      );
      setIsEditPlaylistModalOpen({ open: false, id: null });
      setName("");
      setDescription("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PlaylistModal
      isModalOpen={isEditPlaylistModalOpen.open}
      closeModal={() =>
        setIsEditPlaylistModalOpen({ open: false, playlist: null })
      }
      modalHeader="Edit a playlist"
      modalBtnText="Save"
      name={name}
      description={description}
      setName={setName}
      setDescription={setDescription}
      handleSubmit={editPlaylist}
    />
  );
};

export default EditPlaylistModal;
