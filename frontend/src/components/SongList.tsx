import { useEffect, useState } from "react";
import { fetchSongs, deleteSong } from "./../services/api";
import { setSongs, deleteSong as DELETE } from "../store/songSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { TbMusicPlus } from "react-icons/tb";
import styled from "@emotion/styled";
import Modal from "react-modal";
import AddSong from "./AddSong";
import UpdateSong from "./UpdateSong";
import { toast } from "react-toastify";
import React from "react";

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongHeader = styled.h1`
  text-align: left;
  font-size: 2em;
  margin: 0 0 0 1em;
  padding-top: 0.5em;
  width: 100%;
  text-transform: uppercase;
  font-weight: 500;
  color: gray;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const SongsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100%;
`;
const AddBtn = styled.button`
  display: flex;
  gap: 0.5em;
  align-items: start;
  position: absolute;
  top: 10px;
  left: 10px; /* Adjust this value as needed */
  border-radius: 8px;
  padding: 0.5em 1em;
  border: 1px solid #008000;
  background-color: green;
  color: white;
`;


const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;
const Table = styled.table`
  width: 90%;
  border-collapse: collapse;
  thead {
    background-color: gray;
    color: white;
    th {
      padding: 0.5em 1em;
    }
  }
  tbody {
    tr {
      &:nth-of-type(odd) {
        background-color: #f2f2f2;
      }
      &:hover {
        background-color: #e6e6e6;
      }
      td {
        padding: 0.5em 1em;
      }
    }
  }
`;
const Td = styled.td`
  display: flex;
  align-items: start;
  gap: 0.5em;
  width: 50px;
  hight: 40px;
`;
const EdtBtn = styled.button`
  button {
    background-color: blue;
    border: none;
    color: white;
    font-family: bold;
  }
  padding: 0.5em;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
  cursor: pointer;
  with: 30px;
`;
const DltBtn = styled.button`
  button {
    background-color: red;
    border: none;
    color: white;
    font-family: bold;
  }
  padding: 0.5em;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  with: 30px;
`;
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  padding: 1em;
  box-sizing: border-box;
  transition: opacity 0.25s;
  opacity: 1;
`;
const DltContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  width: 40%;
  padding: 1em;
  background-color: white;
  border-radius: 8px;
  h1 {
    font-size: 1.2em;
    margin: 0;
    color: #1a1a1a;
    padding: 0;
  }
  p {
    font-size: 1em;
    margin: 0;
    padding: 0;
    color: red;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 2em;
`;
const DltButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 8px;
  background-color: red;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: red;
  }
`;
const CancelBtn = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 8px;
  background-color: green;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: green;
  }
`;

const SongList = () => {
  Modal.setAppElement("#root");
  const [addModal, setAddSong] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [editingSong, setEditingSong] = useState({});
  const [deletingSong, setDeletingSong] = useState({} as Song);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { songs } = useSelector((state: RootState) => state.songs);
  const { statistics } = useSelector((state: RootState) => state.statistics);
  const dispatch = useDispatch();

  const handleSongSelect = (song: Song) => () => {
    setUpdateModal(true);
    setEditingSong(song);
  };

  const handleDeleteModal = (song: Song) => () => {
    setModalIsOpen(true);
    setDeletingSong(song);
  };

  const handleSongDelete = async () => {
    setDeleteLoading(true);
    setDeleteError("");
    try {
      const res = await deleteSong(deletingSong._id);
      if (res?.success) {
        dispatch(DELETE(deletingSong._id));
        toast.success("Song deleted successfully");
      } else {
        setDeleteError("Error deleting song, try again");
      }
    } catch (error) {
      setDeleteError("Server error, try again later");
    } finally {
      setDeleteLoading(false);
      setModalIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchSongsFromBackend = async () => {
      try {
        const res = await fetchSongs();
        if (res && res.songs) {
          dispatch(setSongs(res.songs));
        } else {
          console.error("Invalid response format:", res);
          toast.error("Error fetching songs, please try again later.");
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
        toast.error("Error fetching songs, try again later.");
      }
    };
    fetchSongsFromBackend();
  }, [dispatch]);

  if (songs.length === 0 || !statistics) {
    return <h2>Loding....</h2>;
  }

  return (
    <SongsTableContainer>
      {modalIsOpen && (
        <StyledModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Confirm Delete"
        >
          <DltContainer>
            <h1>This Song will be deleted, are you sure?</h1>
            {deleteError && <p>{deleteError}</p>}

            <ButtonsContainer>
              <DltButton type="button" onClick={handleSongDelete}>
                {deleteLoading ? "Deleting..." : "Delete"}
              </DltButton>
              <CancelBtn type="button" onClick={() => setModalIsOpen(false)}>
                Cancel
              </CancelBtn>
            </ButtonsContainer>
          </DltContainer>
        </StyledModal>
      )}
      {addModal && <AddSong onClose={() => setAddSong(false)} />}
      {updateModal && (
        <UpdateSong
          onClose={() => setUpdateModal(false)}
          song={editingSong as Song}
        />
      )}
      <SongHeader>Songs:</SongHeader>
      <BtnContainer>
        <AddBtn onClick={() => setAddSong(true)}>
          <TbMusicPlus />
          Create
        </AddBtn>
      </BtnContainer>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <Td>
                <EdtBtn>
                  <button onClick={handleSongSelect(song)}>Edit</button>
                </EdtBtn>
                <DltBtn>
                  <button onClick={handleDeleteModal(song)}>Delete</button>
                </DltBtn>
              </Td>{" "}
            </tr>
          ))}
        </tbody>
      </Table>
    </SongsTableContainer>
  );
};

export default SongList;
