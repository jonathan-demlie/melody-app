import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";

import { setstatistics } from "../store/statisticsSlice";
import { getStatistics } from "../services/api";
import styled from "@emotion/styled";
import { SiSpacex } from "react-icons/si";
import { Song } from "../store/songSlice";

const StatsContainer = styled.div`
background-color: gray;
display: flex-col;
padding: 0;
padding-top: 0.5em;
background-color: white;
border-radius: 5px;

`;


const StatisticsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: lightgray;

  
`;

const TableHeader = styled.th`
  background-color: gray;
  padding: 8px;
  text-align: left;

`;
const StatsTableContainer = styled.th`
  background-color: whitegray;
  padding: 8px;
  text-align: left;

`;

const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;



const Statistics = () => {

  const { statistics }: any = useSelector(
    (state: RootState) => state.statistics
  );

  const dispatch = useDispatch();


  useEffect(() => {
    const fetchStatsFromBackend = async () => {
      try {
        const response = await getStatistics();
        if (response.success) {
          console.log(response.statistics);

          dispatch(setstatistics(response.statistics));
        } else {
          console.error(response.error);
        }
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchStatsFromBackend();
  }, [dispatch]);

  return (
    <StatsContainer>
      <h2>Songs Statistics</h2>
      {statistics && (
        <div>
          <StatisticsTable>
            <tbody>
              <tr>
                <StatsTableContainer>Total Songs #</StatsTableContainer>
                <TableCell>{statistics?.totalSongs}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total Artists #</StatsTableContainer>
                <TableCell>{statistics?.totalArtists}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total Albums #</StatsTableContainer>
                <TableCell>{statistics?.totalAlbums}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total Genres #</StatsTableContainer>
                <TableCell>{statistics?.totalGenres}</TableCell>
              </tr>
            </tbody>
          </StatisticsTable>

          <SiSpacex />
         
          <h2>Stastics Details # </h2>



          {/* <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Genre</TableHeader>
                <TableHeader>Song</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.songsInGenres &&
                statistics.songsInGenres.map((item: any) => (
                  <tr key={item.genre}>
                    <TableCell>{item.genre}</TableCell>
                    <TableCell>{item.song}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
          <SiSpacex />

          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Artist</TableHeader>
                <TableHeader>Song</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.songsByArtists &&
                statistics.songsByArtists.map((item: any) => (
                  <tr key={item.artist}>
                    <TableCell>{item.artist}</TableCell>
                    <TableCell>{item.song}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
          <SiSpacex />

          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Album</TableHeader>
                <TableHeader>Song</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.songsInAlbums &&
                statistics.songsInAlbums.map((item: any) => (
                  <tr key={item.album}>
                    <TableCell>{item.album}</TableCell>
                    <TableCell>{item.song}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
          <SiSpacex /> */}

<StatisticsTable>
        <thead>
          <tr>
            <TableHeader>Genre</TableHeader>
            <TableHeader>Count</TableHeader>
          </tr>
        </thead>
        <tbody>
          {statistics.songsInGenres &&
            statistics.songsInGenres.map((item: any) => (
              <tr key={item.genre}>
                <TableCell>{item.genre}</TableCell>
                <TableCell>{item.totalSongs}</TableCell>
              </tr>
            ))}
        </tbody>
      </StatisticsTable>
      <SiSpacex />

      {/* Display total songs by artist */}
      <StatisticsTable>
        <thead>
          <tr>
            <TableHeader>Artist</TableHeader>
            <TableHeader>Count</TableHeader>
          </tr>
        </thead>
        <tbody>
          {statistics.songsByArtists &&
            statistics.songsByArtists.map((item: any,) => (
              <tr key={item.artist}>
                <TableCell>{item.artist}</TableCell>
                <TableCell>{item.totalArtists}</TableCell>
              </tr>
            ))}
        </tbody>
      </StatisticsTable>
      <SiSpacex />

      {/* Display total songs by album */}
      <StatisticsTable>
        <thead>
          <tr>
            <TableHeader>Album</TableHeader>
            <TableHeader>Count</TableHeader>
          </tr>
        </thead>
        <tbody>
          {statistics.songsInAlbums &&
            statistics.songsInAlbums.map((item: any) => (
              <tr key={item.artist}>
                <TableCell>{item.totalArtists}</TableCell>
                <TableCell>{item.totalArtists}</TableCell>
              </tr>
            ))}
        </tbody>
      </StatisticsTable>
      <SiSpacex />




      <SiSpacex />
          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Artist</TableHeader>
                <TableHeader>Total Songs</TableHeader>
                <TableHeader>Total Albums</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.artistAlbumCounts &&
                statistics.artistAlbumCounts.map((item: any) => (
                  <tr key={item.artist}>
                    <TableCell>{item.artist}</TableCell>
                    <TableCell>{item.totalSongs}</TableCell>
                    <TableCell>{item.totalAlbums}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
        </div>
      )}
    </StatsContainer>
  );
};

export default Statistics;