const Song = require("../model/Song");
const mongoose = require('mongoose');

// Create a New Song
const createSong = async (req, res) => {
    try {
        const { title, artist, album, genre } = req.body;
        // Check if all required fields are filled
        if (!title || !artist || !album || !genre) {
          return res
            .status(400)
            .json({ message: 'Please fill in all fields', success: false });
        }
    
        const newSong = await Song.create({ title, artist, album, genre });
        if (!newSong) {
          return res
            .status(400)
            .json({ message: 'Song not created', success: false });
        }
    
        res.status(201).json({ song: newSong, success: true });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

// Get All Songs
const getAllSongs = async (req, res) => {
    try {
        // Retrieve all songs and sort by updatedAt descending
        const songs = await Song.find().sort({ updatedAt: -1 }).exec();
        res.status(200).json({ songs, success: true });
      } catch (error) {
        res.status(500).send({ message: error.message, success: false });
      }
};

// Update Song by ID
const updateSongById = async (req, res) => {
    const { title, artist, album, genre } = req.body;
    const songId = req.params.id;

   try {
    const songToUpdateById = await Song.findById(songId);
    // Check if the song exists
    if (!updateSongById) {
      return res
        .status(404)
        .json({ message: 'Song not found', success: false });
    }

    // Check if at least one field is filled
    if (!title && !artist && !album && !genre) {
      return res
        .status(400)
        .json({ message: 'Please fill at least one field', success: false });
    }
    
    // Update song fields if provided
    if (title) songToUpdateById.title = title || songToUpdateById.title;
    if (artist) songToUpdateById.artist = artist || songToUpdateById.artist;
    if (album) songToUpdateById.album = album || songToUpdateById.album;
    if (genre) songToUpdateById.genre = genre || songToUpdateById.genre;

    // Save updated song
    const updatedSong = await songToUpdateById.save();
    if (!updatedSong) {
      return res
        .status(400)
        .json({ message: 'Song not updated', success: false });
    }

    res.status(200).json({ song: updatedSong, success: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete Song by ID
const deleteSongById = async (req, res) => {
    const songId = req.params.id;

    try {
        // Find and delete song by ID
        const deletedSong = await Song.findByIdAndDelete(songId);
        if (!deletedSong) {
          return res
            .status(400)
            .json({ message: 'Song not deleted', success: false });
        }
    
        res.status(200).json({ song: deletedSong, success: true });
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};

// Get Overall Statistics
const getOverallStatistics = async (req, res) => {
  try {
    // Get total songs
    const totalSongs = await Song.countDocuments();

    // Get total albums
    const totalAlbums = await Song.aggregate([
      { $group: { _id: '$album', count: { $sum: 1 } } },
    ]).then((albums) => albums.length);

    // Get total artists
    const totalArtists = await Song.aggregate([
      { $group: { _id: '$artist', count: { $sum: 1 } } },
    ]).then((artists) => artists.length);

    // Get total genres
    const totalGenres = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]).then((genres) => genres.length);

    // Get genre counts
    const genreCounts = await Song.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
    ]);

    // Get songs in genres
    const songsInGenres = await Song.aggregate([
      { $group: { _id: { genre: '$genre', song: '$name' }, count: { $sum: 1 } } },
      { $project: { _id: 0, genre: '$_id.genre', song: '$_id.song', count: '$count' } }
    ]);

    // Get songs by artists
    const songsByArtists = await Song.aggregate([
      { $group: { _id: { artist: '$artist', song: '$name' }, count: { $sum: 1 } } },
      { $project: { _id: 0, artist: '$_id.artist', song: '$_id.song', count: '$count' } }
    ]);

    // Get songs in albums
    const songsInAlbums = await Song.aggregate([
      { $group: { _id: { album: '$album', song: '$name' }, count: { $sum: 1 } } },
      { $project: { _id: 0, album: '$_id.album', song: '$_id.song', count: '$count' } }
    ]);

    // Get songs and albums for each artist
    const artistAlbumCounts = await Song.aggregate([
      {
        $group: {
          _id: '$artist',
          totalSongs: { $sum: 1 },
          totalAlbums: { $addToSet: '$album' },
        },
      },
      {
        $project: {
          _id: 0,
          artist: '$_id',
          totalSongs: 1,
          totalAlbums: { $size: '$totalAlbums' },
        },
      },
    ]);

    // Get song statistics for each album statistics
    const songStatistics = await Song.aggregate([
      { $group: { _id: '$album', totalSongs: { $sum: 1 } } },
    ]);

    res.json({
      statistics: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        genreCounts,
        songsInGenres,
        songsByArtists,
        songsInAlbums,
        artistAlbumCounts,
        songStatistics,
      },
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = {
    getAllSongs,
    createSong,
    updateSongById,
    deleteSongById,
    getOverallStatistics,
};
