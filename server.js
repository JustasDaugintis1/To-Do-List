const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

//Bodyparser Middleware

app.use(bodyParser.json());

//serve static assets of om  production

if(process.env.NODE_ENV == 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

//DB config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
    .connect(db)
    .then(()=> console.log('mongoDB connected...'))
    .catch(err => console.log(err));

//Use ports
app.use('/api/items', items);

    const port = process.env.PORT || 5001;

    app.listen(port, ()=> console.log('Server started on', port));
