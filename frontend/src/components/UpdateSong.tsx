import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSong } from '../services/api';
import { updateSong as UPDATE } from '../store/songSlice';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { IoMdClose } from 'react-icons/io';
import loading from '../assets/loading.svg';


interface UpdateSongProps {
  song: {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
  };
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
  color: black;
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
  color: gray;
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
  transition: background-color 0.25s;
  &:hover {
    background-color: green;
  }
`;

const UpdateSong: React.FC<UpdateSongProps> = ({ onClose, song }) => {
  const dispatch = useDispatch();
  const [updatedSong, setUpdatedSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUpdateSong = async () => {
    if (
      !updatedSong.title &&
      !updatedSong.artist &&
      !updatedSong.album &&
      !updatedSong.genre
    ) {
      setError('Please change at least one field to update song');
      return;
    }

    try {
      setUpdateLoading(true);
      setError('');
      const res = await updateSong(song?._id, updatedSong);
      if (res?.success) {
        dispatch(UPDATE(res?.song));
        toast.success('Song updated successfully');
      } else {
        setError('Failed to update song');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update song');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          Update Song
          <ModalCloseButton onClick={onClose}>
            <IoMdClose />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <InputContainer>
            <InputLabel>Title:</InputLabel>
            <Input
              type="text"
              value={updatedSong?.title || song.title || ''}
              onChange={(e) =>
                setUpdatedSong({ ...updatedSong, title: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Artist:</InputLabel>
            <Input
              type="text"
              value={updatedSong.artist || song.artist || ''}
              onChange={(e) =>
                setUpdatedSong({ ...updatedSong, artist: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Album:</InputLabel>
            <Input
              type="text"
              value={updatedSong.album || song.album || ''}
              onChange={(e) =>
                setUpdatedSong({ ...updatedSong, album: e.target.value })
              }
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Genre:</InputLabel>
            <Input
              type="text"
              value={updatedSong.genre || song.genre || ''}
              onChange={(e) =>
                setUpdatedSong({ ...updatedSong, genre: e.target.value })
              }
            />
          </InputContainer>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <StyledButton onClick={handleUpdateSong} disabled={updateLoading}>
            Update Song
            {updateLoading &&  <h2>Loading...</h2>}
          </StyledButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateSong;
