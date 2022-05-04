//framework that connect frontend and backend
const express = require("express");
const mongoose = require("mongoose");
//information coming to server in json format that format cannot understand by server. sp body-parser convert json file to javascript object, that can be understand by the server.
const bodyParser = require('body-parser');
//cors is a node.js package for providing a connect/express middleware that can be used to two domain in one browser
const cors = require('cors');


const app = express();

//import routes
const feedbackRoutes = require('./routes/feedbacks');
const offerRoutes = require('./routes/offers');
const inventryRoutes = require('./routes/inventrys');
const orderRoutes = require('./routes/orders.js');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware (user send request to frontend and that frontend request hit to this "feedbackroutes". them this code to that requests to routes.)
app.use(feedbackRoutes);
app.use(offerRoutes);
app.use(inventryRoutes);
app.use(orderRoutes);

const port = 8000;
const DB_URL= 'mongodb+srv://admin:admin@cluster0.wu8ee.mongodb.net/ITPM?retryWrites=true&w=majority';

mongoose.connect(DB_URL)
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=> console.log('DB Connection error',err));

app.listen(port, () =>{
    console.log(`App is running on ${port}`);
});

app.use(express.static('images'))
