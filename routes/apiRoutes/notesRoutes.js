const { createNewNote, validateNote} = require('../../lib/notes')
const { notes } = require('../../data/notes');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    let results = notes;

    return res.json(results);
});

router.post('/notes', (req,res) => {
    // Set ID based on what the next index of the array will be
    req.body.id = Date.now().toString();

    // If any data in req.body is incorrect, send 400 err
    if (!validateNote(req.body)) {
        res.status(400).send('Your note is not properly formatted.')
    } else {
        // Add note to json file
        const note = createNewNote(req.body, notes);

        res.json(note);
    }
});

router.delete('/notes/:id', (req,res) => {
    const chosen = req.params.id;

    //Iterate through the notes' ids tp check if it matches `req.params.id`
    for (let i= 0; i < notes.length; i++) {
        if (chosen === notes[i].id) {
            notes.splice(notes[i], 1)
            
            return res.json(notes);
        }
    }
})
module.exports = router;