const Event = require('../models/event');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else{
        req.flash('error', 'You are already logged in');
        return res.redirect('/users/profile');
    }
};

//check if the user is autheticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    }else{
        console.log('this is the isLoggedIn middleware');
        req.flash('error', 'You need to log in first');
        return res.redirect('/users/login');
    }
};

//check if the user is the author of the story
exports.isAuthor = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Event id');
        err.status = 400;
        return next(err);
    }

    Event.findById(id)
    .then(event=> {
        if(event){
            if(event.hostName == req.session.user){
                return next();
            }else{
                let err = new Error('You are not authorized to access the resource');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find an Event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=> next(err));

};