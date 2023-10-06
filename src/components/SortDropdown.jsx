import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiCheck } from "react-icons/bi";
import { useGlobalContext } from "../context";

function SortDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { playlistSortType, setPlaylistSortType } = useGlobalContext();

  const selectOption = (e) => {
    if (e.target.localName === "li" && e.target.className.includes("item")) {
      setPlaylistSortType(e.target.childNodes[0].innerHTML);
      setIsDropdownOpen(false);
      return;
    }
    if (e.target.localName !== "ul" && e.target.localName !== "button") {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      selectOption(e);
    });
  }, []);

  return (
    <Wrapper>
      <button
        className="btn toggle-dropdown"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{playlistSortType}</span>
        {isDropdownOpen ? (
          <IoMdArrowDropup className="arrow" />
        ) : (
          <IoMdArrowDropdown className="arrow" />
        )}
      </button>
      {isDropdownOpen && (
        <ul className="dropdown">
          <li>
            <p>Sort By</p>
          </li>
          <li
            className={`item ${
              playlistSortType === "Recently Added" ? "selected" : ""
            }`}
          >
            <button>Recently Added</button>
            {playlistSortType === "Recently Added" && (
              <BiCheck className="check" />
            )}
          </li>
          <li
            className={`item ${
              playlistSortType === "Alphabetical" ? "selected" : ""
            }`}
          >
            <button>Alphabetical</button>
            {playlistSortType === "Alphabetical" && (
              <BiCheck className="check" />
            )}
          </li>
          <li
            className={`item ${
              playlistSortType === "Creator" ? "selected" : ""
            }`}
          >
            <button>Creator</button>
            {playlistSortType === "Creator" && <BiCheck className="check" />}
          </li>
        </ul>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .toggle-dropdown {
    display: flex;
    align-items: center;
    background-color: var(--black);
    border: none;
    cursor: pointer;
  }

  .toggle-dropdown span {
    display: block;
    width: 10rem;
    pointer-events: none;
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .arrow {
    font-size: 2.5rem;
    pointer-events: none;
  }

  .dropdown {
    width: 16rem;
    padding: 0.5rem;
    background-color: #282828;
    position: absolute;
    display: flex;
    flex-direction: column;
    list-style: none;
    transform: translateX(-1rem) translateY(1rem);
    border-radius: 4px;
  }

  .item {
    padding: 1.2rem 1rem;
    border-radius: 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .item:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  p {
    padding: 1rem;
    color: var(--gray);
    font-size: 1.1rem;
    font-weight: 500;
  }

  .item button {
    background: transparent;
    color: var(--white);
    border: none;
    pointer-events: none;
  }

  .check {
    font-size: 2.5rem;
    pointer-events: none;
  }

  .item.selected button,
  .item.selected .check {
    color: var(--green);
  }
`;

export default SortDropdown;
