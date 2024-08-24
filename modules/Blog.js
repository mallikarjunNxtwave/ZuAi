const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    heading: {
        type: String
    },
    description: {
        type: String
    },
    blogpost: {
        type: String,
    },
    createdDate: {
        type: Date,
        required: true
    },
    imageUrl: {
        type: String
    }
})

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;