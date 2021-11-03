var express = require('express');
var router = express.Router();

/*let movies = [{

    id: String,
    movie: String,
    yearOfRelease: Number,
    duration: Number //en minutes,
    actors: [String, String],
    poster: String //lien vers une image d'affiche,
    boxOffice : Number // en USD$
    rottenTomatoesScore: Number

}];*/

/* PUT - CREATE */
router.put('/movies', (req,res) => {
    //Get the data from request tor request
    const {user} = req.body;
    //Create new unique id
    const id = _.uniqueId();
    //Insert it in array
    users.push({user, id});
    //Return message
    res.json({
        message: `Just added ${id}`,
        user: {user, id}
    });
});


/* GET - READ ALL MOVIES */
router.get('/movies', (req, res) => {
    res.status(200).json({users});
  });

/* GET - ONE MOVIE */
router.get('/movies/:id', (req,res) => {
    //Get id in parameters
    const {id} = req.params;
    //Find movie in database
    const user = _.find(users, ["id",id]);
    //Return movie
    res.status(200).json({
        message: 'Movie Found !',
        user
    });
});

/* POST - UPDATE */
router.post('/movies/:id', (req,res) => {
    //Get the ID
    const{id} = req.params;
    //Get the data
    const{user}=req.body;
    //Find in database
    const userToUpdate = _.find(users, ["id", id]);
    //Update Data
    userToUpdate.user=user;
    //Return Message
    res.json({
        message: `Just updated ${id} with ${user}`
    });
});


/* GET - DELETE */
router.delete('/movies/:id', (req,res) => {
    //Get the ID
    const{id}=req.params;
    //Remove from database
    _.remove(users, ["id", id]);
    //Return message
    res.json({
        message: `Just removed ${id}`
    });
});

module.exports = router;

