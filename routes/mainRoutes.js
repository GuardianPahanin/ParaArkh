//all of these methods are for the /stories route
        //these are used like a list of mehtods that can be used for the /stories route
        //creating different  links like get, post, put, delete




        const express = require('express');                 //imports the express module as a variable called express
        const controller = require('../controllers/mainController'); //imports the storyController module as a variable called controller
        
        const router = express.Router();                    //creates a new router object and assigns it to the variable router
        


        //place routes here

        
        //GET /main: get main page (this is the home rought and is present in the main  routes module)(we got points taken off for this and it was here)
        router.get('/', controller.index);                        


        //GET /main/about: get about page
        router.get('/main/about', controller.about);

        
        //GET /main/contact: get contact page
        router.get('/main/contact', controller.contact);

        
        //exports the routes
        module.exports = router;                            //exports the router object so that it can be used in other files