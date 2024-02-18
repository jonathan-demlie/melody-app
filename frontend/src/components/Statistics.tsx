import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/rootReducer";
import { setstatistics } from "../store/statisticsSlice";
import { getStatistics } from "../services/api";
import styled from "@emotion/styled";
import { SiSpacex } from "react-icons/si";

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
      <h2> Overall Statistics</h2>
      {statistics && (
        <div>
          <StatisticsTable>
            <tbody>
              <tr>
                <StatsTableContainer>Total # Songs</StatsTableContainer>
                <TableCell>{statistics?.totalSongs}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total # Artists</StatsTableContainer>
                <TableCell>{statistics?.totalArtists}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total # Albums</StatsTableContainer>
                <TableCell>{statistics?.totalAlbums}</TableCell>
              </tr>
              <tr>
                <StatsTableContainer>Total # Genres</StatsTableContainer>
                <TableCell>{statistics?.totalGenres}</TableCell>
              </tr>
            </tbody>
          </StatisticsTable>
          <SiSpacex />

          <h2>Detail Stastics</h2>
          <h3>Total # Songs in A Genre</h3>

          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Genre</TableHeader>
                <TableHeader>Total Songs</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.genreCounts &&
                statistics.genreCounts.map((item: any) => (
                  <tr key={item._id}>
                    <TableCell>{item._id}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
          <SiSpacex />

          <h3>Total # Songs in An Artist</h3>
          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Artist</TableHeader>
                <TableHeader>Total Songs</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.songsByArtists &&
                statistics.songsByArtists.map((item: any) => (
                  <tr key={item.artist}>
                    <TableCell>{item.artist}</TableCell>
                    <TableCell>{item.count}</TableCell>
                  </tr>
                ))}
            </tbody>
          </StatisticsTable>
          <SiSpacex />
          <h3>Total # Songs & Albums in An Artist</h3>

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

          <SiSpacex />
          <h3>Total # Songs in Album</h3>
          <StatisticsTable>
            <thead>
              <tr>
                <TableHeader>Album</TableHeader>
                <TableHeader>Total Songs</TableHeader>
              </tr>
            </thead>
            <tbody>
              {statistics.songsInAlbums &&
                statistics.songsInAlbums.map((item: any) => (
                  <tr key={item.album}>
                    <TableCell>{item.album}</TableCell>
                    <TableCell>{item.count}</TableCell>
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
