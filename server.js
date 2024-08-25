// const express = require('express');
// const path = require('path');
// const app = express();
// app.use(express.static(__dirname + '/dist/twisted-mountain-assignment'));
// app.get('/*', function(req,res) {
// res.sendFile(path.join(__dirname+
// '/dist/twisted-mountain-assignment/index.html'));});
// app.listen(process.env.PORT || 8080);


const express = require('express');
const path = require('path');
const app = express();

// Serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/twisted-mountain-assignment/browser')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/twisted-mountain-assignment/browser/index.html'));
});

// Start the app by listening on the default Heroku port or port 8080
app.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port', process.env.PORT || 8080);
});
