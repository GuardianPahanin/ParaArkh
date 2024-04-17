const model = require('../models/user');
const Event = require('../models/event');


//set up routes
exports.index = ('/', (req, res)=>{
    res.render('index');
});

//get the sign up form
exports.new = (req, res)=>{
    return res.render('./user/new');
};

//create a new user
exports.create = (req, res, next)=>{
    let user = new model(req.body);
        user.save()
        .then(user=> res.redirect('/users/login'))
        .catch(err=>{
            if(err.name === 'ValidationError' ) {
                req.flash('error', err.message);  
                return res.redirect('/users/new');
            }
    
            if(err.code === 11000) {
                req.flash('error', 'Email has been used');  
                return res.redirect('/users/new');
            }
            
            next(err);
        });
    
};

//get the login form
exports.loginShow = (req, res)=>{
    return res.render('./user/login');
};

//process the login form
exports.login = (req, res, next)=>{
    
    let email = req.body.email;
    let password = req.body.password;
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/users/login');
            } else {
            user.comparePassword(password)
            .then(result=>{
                if(result) {
                    req.session.user = user._id;
                    req.flash('success', 'You have successfully logged in');
                    res.redirect('/users/profile');
            } else {
                req.flash('error', 'wrong password');      
                res.redirect('/users/login');
            }
            });     
        }     
    })
    .catch(err => next(err));
};

//get the profile
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), Event.find({hostName: id})])
    .then(results=>{
        const [user, event] = results;
        res.render('./user/profile', {user, event});
    })
    .catch(err=>next(err));
};

//log out the user
exports.logout =  (req, res, next)=>{
    console.log(req.session + ': this is the session');
    req.session.destroy(err=>{
        if(err) 
            return next(err);
        else 
            console.log('You have successfully logged out');
            console.log(req.session + ': this is the session after delete');
            res.redirect('/');
    });
};