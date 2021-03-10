const express = require('express');
const chirpstore = require('../chirpstore.js');
const router = express.Router();

// Get all chirps /api => /chirps =>  /
router.get("/", (req, res) => {
    const chirps = chirpstore.GetChirps();
    delete chirps.nextid
    const tempArr = Object.entries(chirps);
    const chirpArr = tempArr.map(chirp => {
        const newChirp = {
            id: chirp[0],
            user: chirp[1].user,
            message: chirp[1].message
        }
        return newChirp
    });
    chirpArr.reverse();
    res.send(chirpArr);
});

// Create a new chirp
router.post("/", (req, res) => {
    chirpstore.CreateChirp(req.body);
    res.sendStatus(200);
});

//Edit a chirp
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const chirp = req.body;
    chirpstore.UpdateChirp(id, chirp);
    res.sendStatus(200);
});

// Delete a chirp
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    chirpstore.DeleteChirp(id);
    res.sendStatus(200);
});

module.exports = router;