    const express = require('express') ; 
const cookieParser = require('cookie-parser');

const app = express() ; 

require('dotenv').config() ;
const cors = require('cors') // This is new
const port = process.env.PORT;

// Middleware
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new


require('./config/mongoose.config');
//routes 
require('./routers/main.route')(app); 
require("./routers/message.route")(app);
require('./routers/post.route')(app); 
require('./routers/follow.route')(app); 
require("./routers/like.route")(app); 
require("./routers/comment.route")(app) ;


app.listen(port, () => console.log(`Listening on port: ${port}`) );