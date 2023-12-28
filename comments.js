// Create web server with Express.
// Use MongoDB to store data.
// Use Mongoose to connect to MongoDB.
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Set view engine
app.set('view engine', 'pug');

// Set static files
app.use(express.static('public'));

// Set body parser
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { comments: comments });
        }
    });
});

app.post('/', (req, res) => {
    const comment = new Comment(req.body);
    comment.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/delete/:id', (req, res) => {
    Comment.findByIdAndDelete(req.params.id, err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

// Listen to port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
