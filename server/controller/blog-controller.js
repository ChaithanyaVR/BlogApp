import { nanoid } from "nanoid";
import Blog from "../model/Blog.js";
import UserInfo from '../model/UserInfo.js'




// export const createBlog = (req, res) => {
//   const authorId = req.user; // set by verifyJWT
//   let { title, des, banner, tags, content, draft } = req.body;

//   if (!title || !title.length) {
//     return res.status(403).json({ error: "You must provide a title to publish the blog" });
//   }

//   if (!des || des.length > 200) {
//     return res
//       .status(403)
//       .json({ error: "You must provide blog description under 200 characters" });
//   }

//   if (!banner || !banner.length) {
//     return res.status(403).json({ error: "You must provide blog banner to publish it" });
//   }

//   if (!content || !Array.isArray(content.blocks) || content.blocks.length === 0) {
//     return res.status(403).json({ error: "There must be some blog content to publish it" });
//   }

//   if (!tags || !Array.isArray(tags) || tags.length === 0 || tags.length > 10) {
//     return res
//       .status(403)
//       .json({ error: "Provide tags in order to publish the blog, Maximum 10" });
//   }

//   tags = tags.map((tag) => tag.toLowerCase());

//   const blog_id =
//     title
//       .replace(/[^a-zA-Z0-9]/g, " ")
//       .replace(/\s+/g, "-")
//       .trim()
//       .toLowerCase() + "-" + nanoid();

//   let blog = new Blog({
//     title, des, banner, content, tags, author: authorId, blog_id, draft: Boolean(draft)
//     })

//     blog.save().then(blog => {
//     let incrementVal = draft ? 0 : 1;
//     UserInfo.findOneAndUpdate({_id: authorId}, {$inc:{"account_info.total_posts": incrementVal}, $push:{"blogs":blog._id}})
//    .then(user=> {
//     return res.status(200).json({id:blog.blog_id})
//    })
//    .catch(error=>{
//     return res.status(500).json({error:"Failed to update the total posts"})
//    })
//     })
//     .catch(err => {
//         return res.status(500).json({err: err.message})
//     })

  

//   return res.status(200).json({status: "done"});
// };




export const createBlog = (req, res) => {
  const authorId = req.user; // set by verifyJWT
  let { title, des, banner, tags, content, draft } = req.body;

  if (!title || !title.length) {
    return res.status(403).json({ error: "You must provide a title to publish the blog" });
  }

  if (!des || des.length > 200) {
    return res.status(403).json({ error: "You must provide blog description under 200 characters" });
  }

  if (!banner || !banner.length) {
    return res.status(403).json({ error: "You must provide blog banner to publish it" });
  }

  if (!content || !Array.isArray(content.blocks) || content.blocks.length === 0) {
    return res.status(403).json({ error: "There must be some blog content to publish it" });
  }

  if (!tags || !Array.isArray(tags) || tags.length === 0 || tags.length > 10) {
    return res.status(403).json({ error: "Provide tags in order to publish the blog, Maximum 10" });
  }

  tags = tags.map((tag) => tag.toLowerCase());

  const blog_id =
    title
      .replace(/[^a-zA-Z0-9]/g, " ")
      .replace(/\s+/g, "-")
      .trim()
      .toLowerCase() + "-" + nanoid();

  const blog = new Blog({
    title,
    des,
    banner,
    content,
    tags,
    author: authorId,
    blog_id,
    draft: Boolean(draft)
  });

  blog.save()
    .then((blog) => {
      const incrementVal = draft ? 0 : 1;
      UserInfo.findOneAndUpdate(
  { "personal_info.user": authorId },
  {
    $inc: { "account_info.total_posts": incrementVal },
    $push: { blogs: blog._id },
    $setOnInsert: {
      personal_info: { user: authorId },
    }
  },
  { upsert: true, new: true }
)
        .then(() => {
          return res.status(200).json({ id: blog.blog_id });
        })
        .catch((error) => {
          return res.status(500).json({ error: "Failed to update the total posts" });
        });
    })
    .catch((err) => {
      return res.status(500).json({ err: err.message });
    });
};