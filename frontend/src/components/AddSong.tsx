import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../services/api";
import { addSong as ADD } from "../store/songSlice";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import { IoMdClose } from "react-icons/io";
import loading from "../assets/loading.svg";

interface AddSongProps {
  onClose: () => void;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  width: 500px;
  background-color: white;
  padding: 2em;
  border-radius: 5px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: 500;
  color: #1a1a1a;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const ModalCloseButton = styled.button`
  border: none;
  color: red;
  border-radius: 50%;
  padding: 0;
  background-color: transparent;
  font-size: 1.5em;
  cursor: pointer;
`;
const InputContainer = styled.div`
  display: flex;
  gap: 1em;
  flex: 1;
  width: 100%;
`;
const InputLabel = styled.label`
  font-size: 1.2em;
  font-weight: 500;
  color: #1a1a1a;
  text-transform: uppercase;
`;
const Input = styled.input`
  width: 200px;
  padding: 0.5em 1em;
  margin-left: auto;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid #1a1a1a;
  font-size: 1em;
  font-family: inherit;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  padding: 0.5em;
  border-radius: 8px;
  border: none;
  background-color: green;
  color: white;
  font-size: 1em;
  font-family: inherit;
  cursor: pointer;
`;

const AddSong: React.FC<AddSongProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddSong = async () => {
    if (!newSong.title || !newSong.artist || !newSong.album || !newSong.genre) {
      setError("All fields are required");
      return;
    }

    try {
      setAddLoading(true);
      setError("");
      const res = await addSong(newSong);
      if (res?.success) {
        dispatch(ADD(res?.song));
        toast.success("Song added successfully");
      } else {
        console.log(res?.message);
        setError("Failed to add song");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add song");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          Add New Song
          <ModalCloseButton onClick={onClose}>
            <IoMdClose />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <InputContainer>
            <InputLabel>Title:</InputLabel>
            <Input
              type="text"
              value={newSong?.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Artist:</InputLabel>
            <Input
              type="text"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Album:</InputLabel>
            <Input
              type="text"
              value={newSong.album}
              onChange={(e) =>
                setNewSong({ ...newSong, album: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Genre:</InputLabel>
            <Input
              type="text"
              value={newSong.genre}
              onChange={(e) =>
                setNewSong({ ...newSong, genre: e.target.value })
              }
              required
            />
          </InputContainer>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <StyledButton onClick={handleAddSong} disabled={addLoading}>
            Add Song
            {addLoading && <h2>Loading...</h2>}
          </StyledButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSong;
