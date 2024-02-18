import styled from '@emotion/styled';
import SongList from '../components/SongList';
import Statistics from '../components/Statistics';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';

const HomePageContainer = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 95vw;
  height: 87vh;
  padding: 0;
  padding-top: 0em;
  background-color: lightgray;
  font-family: 'Roboto';
  border-radius: 5px;
  color: black;
  overflow-y: auto;
`;
const SongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  max-height: 100%;
  background-color: white;
  font-family: 'Roboto';

`;
const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5em;
  align-items: start;
  float: right;
  width: 100%;
  background-color: white;

`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <SongContainer>
        <SongList />
      </SongContainer>
      <StatsContainer>
        <Statistics/>
      </StatsContainer>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </HomePageContainer>
  );
};

export default HomePage;
