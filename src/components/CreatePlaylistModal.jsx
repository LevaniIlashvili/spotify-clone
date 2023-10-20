import styled from "styled-components";
import { useGlobalContext } from "../context";
import { MdClear } from "react-icons/md";
import { useRef, useState } from "react";
import axios from "axios";

const CreatePlaylistModal = () => {
  const {
    accessToken,
    isPlaylistModalOpen,
    setIsPlaylistModalOpen,
    user,
    setUserPlaylists,
  } = useGlobalContext();
  const outsideModal = useRef();
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
      setUserPlaylists((prev) => [...prev, response.data]);
      setIsPlaylistModalOpen(false);
      setName("");
      setDescription("");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper
      className={`${isPlaylistModalOpen ? "" : "hidden"}`}
      ref={outsideModal}
      onClick={(e) =>
        e.target === outsideModal.current && setIsPlaylistModalOpen(false)
      }
    >
      <div className="modal-window">
        <div className="top-container">
          <h2>Create a playlist</h2>
          <button
            className="clear-btn"
            onClick={() => setIsPlaylistModalOpen(false)}
          >
            <MdClear />
          </button>
        </div>
        <div className="name-input-container">
          <input
            type="text"
            id="name"
            className="name-input"
            placeholder="Add a name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <label htmlFor="name" className="name-label">
            Name
          </label>
        </div>
        <div className="description-input-container">
          <textarea
            id="description"
            className="description-input"
            placeholder="Add an optional description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <label htmlFor="description" className="description-label">
            Description
          </label>
        </div>
        <button
          className="animated-btn create-playlist-btn"
          onClick={createPlaylist}
        >
          Create
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #000000b3;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);

  &.hidden {
    display: none;
  }

  .modal-window {
    width: 35rem;
    height: 32.5rem;
    background-color: #292929;
    border-radius: 8px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
  }

  .top-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .clear-btn {
    background: transparent;
    border: none;
    font-size: 2.5rem;
    color: var(--gray);
    display: flex;
    align-items: center;
    padding: 0.5rem;
    border-radius: 50%;
  }

  .clear-btn:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  .clear-btn:active {
    background-color: hsla(0, 0%, 100%, 0.2);
  }

  .name-input,
  .description-input {
    background-color: #ffffff1a;
    color: var(--white);
    width: 100%;
    margin-bottom: 1.5rem;
    border: none;
    border-radius: 4px;
    padding: 1rem;
    font-size: 1.35rem;
  }

  .name-input:focus,
  .description-input:focus {
    background-color: #333333;
    outline: 1px solid #ffffff1a;
  }

  .description-input {
    padding: 0.8rem 0.8rem 2.8rem 0.8rem;
    resize: none;
    height: 12rem;
    font-family: inherit;
  }

  .name-input-container,
  .description-input-container {
    position: relative;
  }

  label {
    position: absolute;
    font-size: 1.1rem;
    font-weight: 700;
    top: -8px;
    left: 6px;
    /* display: none; */
    opacity: 0;
    transition: all 0.2s ease-in;
  }

  .name-input:focus + .name-label,
  .description-input:focus + .description-label {
    /* display: block; */
    opacity: 100;
  }

  .create-playlist-btn {
    align-self: flex-end;
    border: none;
    cursor: pointer;
    background-color: var(--white);
    color: var(--black);
    padding: 1.5rem 3rem;
    border-radius: 3rem;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .create-playlist-btn:active {
    background-color: #b6b6b6;
  }
`;

export default CreatePlaylistModal;
