//all of these methods are for the /stories route
        //these are used like a list of mehtods that can be used for the /stories route
        //creating different  links like get, post, put, delete

const express = require('express');                 //imports the express module as a variable called express
const controller = require('../controllers/eventController'); //imports the storyController module as a variable called controller
const router = express.Router();                    //creates a new router object and assigns it to the variable router
const {isLoggedIn, isAuthor} = require('../middleware/auth'); //imports the isLoggedIn and isAuthor functions from the auth.js file in the middleware folder
        
const {fileUpload} = require('../middleware/fileUpload')

//place routes here

        
//GET /event: get main page
router.get('/', controller.index); 

//GET /event/new: get form to create new event
router.get('/new', isLoggedIn, controller.new);

//GET /event/:id: get event details
router.get('/:id', controller.show);
        
//POST /event: create new event
router.post('/', isLoggedIn, fileUpload, controller.create);

//GET /event/:id/edit: get form to edit event
router.get('/:id/edit', isLoggedIn, isAuthor, controller.edit);

//PUT /event/:id: update event
router.put('/:id', isLoggedIn, isAuthor, fileUpload, controller.update); 

//DELETE /event/:id: delete event
router.delete('/:id', isLoggedIn, isAuthor, controller.delete); 
        
//exports the routes
module.exports = router;                            //exports the router object so that it can be used in other files