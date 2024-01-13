const Blogs = require('./../models/Blogs')


const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blogs.find();
        return res.status(200).json({
            blogs,
            message: "Successfully fetched blogs!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Unable to fetch blogs",
            error
        })
    }
}

const getBlogById = async(req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        if(!blog){
            return res.status(404).json({
                message: "Blog Not Found. Invalid Id"
            })
        } else {
            return res.status(200).json({
                blog,
                message: "Blog Fetched Successfully!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const getBlogBySlug = async(req, res) => {
    try {
        const blog = await Blogs.findOne({slug: req.params.slug})
        if(!blog){
            return res.status(404).json({
                message: "Blog Not Found. Invalid URL"
            })
        } else {
            return res.status(200).json({
                blog,
                message: "Blog Fetched Successfully!"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const createBlog = async(req, res) => {
    try {
        const {
            title, 
            content,
            thumbnailLink,
            headImage,
            desc
        } = req.body;
        const blog = new Blogs({
            title,
            desc,
            mainHeaderImageRef: headImage,
            thumbnailLink,
            contentMarkdown: content
        })
        await blog.save();
        return res.status(200).json({
            blog,
            message: "Blog Creation Successful!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Unable to create blog",
            error
        })
    }
}

const updateBlog = async(req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blogs.findById(blogId);
        if(!blog){
            return res.status(404).json({
                message: "Blog not Found. Invalid Blog ID"
            })
        }
        const newData = req.body;
        const updatedBlog = await Blogs.findByIdAndUpdate(
            blogId,
            newData,
            {new: true}
        )
        return res.status(200).json({
            blog: updatedBlog,
            message :"successfully updated the blog!"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Unable to udpate blog",
            error
        })
    }
}

const deleteBlog = async(req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blogs.findById(blogId)
        if(!blog){
            return res.status(404).json({
                message: "Unable to find Blog. Invalid Id"
            })
        } else {
            await Blogs.findByIdAndDelete(blogId)
            return res.status(200).json({
                message: "Successfully deleted blog"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Unable to delete blog",
            error
        })
    }
}

module.exports = {
    getBlogById,
    getBlogBySlug,
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
}