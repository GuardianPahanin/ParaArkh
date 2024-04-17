//imports the mainModel.js file from the models folder
//this is the controller for the main routes just controling functions to handle request associated with general site







//GET /main: get main page
exports.index = (req, res) => {                     //exports the index function so that it can be used in other files
    res.render('index');                            //renders the index.ejs file
};            


//GET /main/about: get about page
exports.about = (req, res) => {                     //exports the about function so that it can be used in other files
    res.render('./main/about');                            //renders the about.ejs file
};


//GET /main/contact: get contact page
exports.contact = (req, res) => {                     //exports the contact function so that it can be used in other files
    res.render('./main/contact');                            //renders the contact.ejs file
};