const mongoose = required("mongoose");

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
    }
})

const Blog = mongoose.modal('blog', blogSchema);

module.exports = Blog;