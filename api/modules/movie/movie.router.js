const router = require('express').Router();
const movieCtrl = require('./movie.controller');

/* api to get a favourite movie*/
router.get('/', movieCtrl.getFavMovie);

/* api to add a movie*/
router.post('/', movieCtrl.addFavMovie);

/* api to update a movie*/
router.put('/movieId', movieCtrl.updateFavMovie);

/* api to delete a movie*/
router.delete('/movieId', movieCtrl.deleteFavMovie);

module.exports = router;