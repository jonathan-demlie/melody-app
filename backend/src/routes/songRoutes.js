const express = require('express');
const router = express.Router();

const {
    createSong,
    getAllSongs,
    updateSongById,
    deleteSongById,
    getOverallStatistics

} = require('../controllers/songController');


//Routes for CRUD
router.post('/songs', createSong);
router.get('/songs',  getAllSongs);
router.put('/songs/:id', updateSongById);
router.delete('/songs/:id', deleteSongById);

router.get('/statistics', getOverallStatistics);

module.exports = router;
