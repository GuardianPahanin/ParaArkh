//imports the eventsModel.js file from the models folder
const { cp } = require('fs');
const event = require('../models/event');
const model  = require('../models/event'); 

        
//GET /events: get main page
exports.index = (req, res, next) => { 
    //res.send('send all events');
    model.find().populate('hostName', 'firstName lastName')
    .then(events => { res.render('./event/index', {events});})
    .catch(err => next(err));
};

//GET /events/new: get form to create new event
exports.new = (req, res) => {                        //exports the new function so that it can be used in other files
    res.render('./event/new');                      //sends the string 'New event form' to the client
};


//POST /events: create new event
exports.create = (req, res, next) => {                    //exports the create function so that it can be used in other files
    //res.send('Created a new event');\\\\\\\\\\\\\\
    let image = "/images/" + req.file.filename; 
    let event = new model(req.body); //create new story document
    event.hostName = req.session.user; //set the author of the story
    event.image = image; // Update the event with image path
    event.save(event) //save the document to the database
    .then((event) => {
        console.log(event);
        res.redirect('/event');
    })
    .catch(err=>{
        if(err.name === 'ValidationError111') {
            err.status = 400; 
        }
        next(err);
    });
};

//GET /events/:id: get event details
exports.show = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id).populate('hostName', 'firstName lastName')
    .then(event=>{
        if(event) {     
            return res.render('./event/show', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};


exports.edit = (req, res, next) => {                   //exports the edit function so that it can be used in other files                        
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id ' + id);
        err.status = 400;
        return next(err);
    }
    
    model.findById(id)
    .then(event =>{
        if(event) {
           return res.render('./event/edit', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })

    .catch(err => next(err));
};

//PUT /events/:id: update event
exports.update = (req, res, next) => {                     //exports the update function so that it can be used in other files
    let event = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id ' + id);
        err.status = 400;
        return next(err);
    }

    //to check the image
    if(req.file && req.file.filename){
        event.image = "/images/" + req.file.filename;
    }else{
        image = "/images/download.jpg"
        let err = new Error('Cannot find a story with id ' + id);
        err.status = 404;
        return next(err);
    }

    //update event and valuditation error
    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event => {
        if(event) {
            res.redirect('/event/'+id);
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        next(err);
        }
    }); 
};

//DELETE /events/:id: delete event
exports.delete = (req, res, next) => {                     //exports the delete function so that it can be used in other files
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event => {
        if(event) {
            res.redirect('/event');
        } else {
            let err = new Error('Cannot find a story with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};




