const Blog = require('../modules/Blog');

const createBlog = async (request, response) => {
    const { username, heading, description, blogpost, imageUrl } = request.body
    const createdDate = new Date();
    try {
        const newBlog = new Blog({
            username,
            heading,
            description,
            blogpost,
            imageUrl,
            createdDate,
        })
        const createdBlog = await newBlog.save();
        response.status(200).json({ message: "Blog created successfully", blog_id: createdBlog._id })
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
}

const getBlogs = async(request,response) => {
    try {
        const allPosts = await Blog.find();
        response.status(200).json({posts: allPosts})
    } catch (error) {
        response.status(400).json({message: error.message})
    }
}

const getBlogWithId = async(request,response) => {
    const {id} = request.params
    try {
        const post = await Blog.findOne({_id: id})
        response.status(200).json({post,})
    } catch (error) {
        response.status(400).json({message: error.message});
    }
}

const updateBlogWithId = async(request,response) => {
    const {id} = request.params
    const {heading,description,blogpost,imageUrl,} = request.body
    try {
        await Blog.findOneAndUpdate({_id: id}, {heading,description,blogpost,imageUrl});
        response.status(200).json({message: "Updated successfully"});
    } catch (error) {
        response.status(400).json({message: error.message});
    }
}

const deleteBlogWithId = async(request,response) => {
    const {id} = request.params
    try {
        await Blog.deleteOne({_id: id});
        response.status(200).json({message: "Deleted Successfully"});
    } catch (error) {
        response.status(400).json({message: error.message});
    }
}

module.exports = { createBlog, getBlogs, getBlogWithId, updateBlogWithId, deleteBlogWithId };