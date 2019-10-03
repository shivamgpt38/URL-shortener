const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
const index = require('./routes/index');

//cheching and connecting db
mongoose.connect(config.database,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	}
)
.then(() => {
	console.log("MongoDB is Connected");
})
.catch((error) => {
	console.log("MongoDB is not connected because of: " + error);
})


const app = express();
app.set('views',path.join(__dirname,'view'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

const urlshort = require('./routes/urlshort');

const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.json());

app.use('/api',urlshort);

app.use('/',index);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
});