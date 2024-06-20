// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');

// Creating an instance of express app
const app = express();

// Using bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data (can be replaced with database integration)
let posts = [
    { id: 1, title: 'Post 1', content: 'This is the content of Post 1' },
    { id: 2, title: 'Post 2', content: 'This is the content of Post 2' }
];

// Route to get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// Route to get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
});

// Route to delete a post
app.delete('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    posts.splice(index, 1); // Remove 1 element from index
    res.json({ message: 'Post deleted successfully' });
});


// Route to create a new post
app.post('/api/posts', (req, res) => {
    const { title, content } = req.body;
    const newPost = {
        id: posts.length + 1,
        title,
        content
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Route to update a post
app.patch('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content } = req.body;
    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    posts[index].title = title;
    posts[index].content = content;

    res.json(posts[index]);
});

// Route to display JSON data directly
app.get('/', (req, res) => {
    res.json(posts);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
