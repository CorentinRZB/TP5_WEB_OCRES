var express = require('express');
const { uniqueId } = require('lodash');
var router = express.Router();
const _ = require('lodash');
//CLE API : cf7e79dd
/*let movies = [{

    id: String,
    movie: String,
    yearOfRelease: Number,
    duration: Number, //en minutes
    actors: [String, String],
    poster: String, //lien vers une image d'affiche
    boxOffice : Number, // en USD$
    rottenTomatoesScore: Number

}];*/
const getMovieInfos = (movieTitle) =>{
    const externalResult = "http://www.omdbapi.com/?apikey=cf7e79dd";
    const movie = {
        id: _.uniqueId(),
        movie: externalResult.Title,
        yearOfRelease: externalResult.Released,
        duration: externalResult.Runtime,
        actors: externalResult.Actors,
        poster: externalResult.Poster,
        boxOffice: externalResult.BoxOffice,
        //rottenTomatoesScore: externalResult.Ratings[1].Value, PAS OPTI
        rottenTomatoesScore: externalResult.find(result => result.Source === 'Rotten Tomatoes').Value

}
return movie;
}

/* PUT - CREATE */
router.put('/movies', (req,res) => {
    //Get the data from request tor request
    const {movie} = req.body;
    //Create new unique id
    const id = _.uniqueId();

    const movieInfos = getMovieInfos(movie);
    //Insert it in array
    movies.push({movieInfos, id});
    //Return message
    res.json({
        message: `Just added ${id}`,
        movie: {movieInfos, id}
    });
});


/* GET - READ ALL MOVIES */
router.get('/movies', (req, res) => {
    res.status(200).json({movies});
  });

/* GET - ONE MOVIE */
router.get('/movies/:id', (req,res) => {
    //Get id in parameters
    const {id} = req.params;
    //Find movie in database
    const movie = _.find(movies, ["id",id]);
    //Return movie
    res.status(200).json({
        message: 'Movie Found !',
        movie
    });
});

/* POST - UPDATE */
router.post('/movies/:id', (req,res) => {
    //Get the ID
    const{id} = req.params;
    //Get the data
    const{movie}=req.body;
    //Find in database
    const movieToUpdate = _.find(movies, ["id", id]);
    //Update Data
    movieToUpdate.movie=movie;
    //Return Message
    res.json({
        message: `Just updated ${id} with ${movie}`
    });
});


/* GET - DELETE */
router.delete('/movies/:id', (req,res) => {
    //Get the ID
    const{id}=req.params;
    //Remove from database
    _.remove(movies, ["id", id]);
    //Return message
    res.json({
        message: `Just removed the movie ${id}`
    });
});

module.exports = router;

