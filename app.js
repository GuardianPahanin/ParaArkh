// require modules
const express = require('express');                 //imports the express module as a variable called express
const morgan = require('morgan');                   //imports the morgan module as a variable called morgan
const methodOverride = require('method-override');
const mongoose = require('mongoose');               //imports the mongoose module as a variable called mongoose
const User = require('./models/user');              //imports the user module as a variable called User
const session = require('express-session');         //imports the express-session module as a variable called session
const MongoStore = require('connect-mongo');         //imports the connect-mongo module as a variable called MongoStore
const flash = require('connect-flash');              //imports the connect-flash module as a variable called flash
const {fileUpload} = require('./middleware/fileUpload');

const mainRoutes = require('./routes/mainRoutes');  //imports the mainRoutes module as a variable called mainRoutes
const eventRoutes = require('./routes/eventRoutes');//imports the eventRoutes module as a variable called eventRoutes
const userRoutes = require('./routes/userRoutes');  //imports the userRoutes module as a variable called userRoutes



//---------------------------------------------------------------------------------
// create app
const app  = express();                             //creates a new express application and assigns it to the variable app



//---------------------------------------------------------------------------------
// configure app
let port = 3000;                                    //assigns the port number 3000 to the variable port
let host = 'localhost';                             //assigns the string 'localhost' to the variable host
let url = 'mongodb+srv://project3:project123@cluster0.p1jvhyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 
app.set('view engine', 'ejs');                      //this tells us where  to find the views for the ejs templates



//---------------------------------------------------------------------------------
// connect to MongoDB
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, dbName: 'project3'})
.then(() => {
    //start the server
    app.listen(port, host, ()=>{
        console.log(`Server is running on ${host}:${port}`);
        console.log('Press Ctrl+C to stop');
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));



//---------------------------------------------------------------------------------
// mount middleware
app.use(express.static('public'));                  //shows were express can find the stativ files like css and js
app.use(express.urlencoded({extended: true}));      //parses the url encoded data(middleware)
app.use(morgan('tiny'));                            //logs the requests to the console
app.use(methodOverride('_method'));

app.use(session({
    secret: 'sssssssss',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 60*60*1000},
    store: new MongoStore({mongoUrl: 'mongodb+srv://project3:project123@cluster0.p1jvhyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'})
}));

app.use(flash());

app.use((req, res, next)=>{
    console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});


//---------------------------------------------------------------------------------
// set up routes

app.use('/', mainRoutes);                       //mounts the mainRoutes module at the /main route
app.use('/event', eventRoutes);                    //mounts the eventRoutes module at the /event route
app.use('/users', userRoutes);                      //mounts the userRoutes module at the /user route





//---------------------------------------------------------------------------------
// 404 and error handling

app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});
