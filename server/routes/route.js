import express from 'express';
import upload from '../utils/upload.js';
// import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
// import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';
import { generateUploadURL } from '../controller/aws-controller.js';
import { createBlog } from '../controller/blog-controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.js';


const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

// router.post('/create', authenticateToken, createPost);
// router.put('/update/:id', authenticateToken, updatePost);
// router.delete('/delete/:id', authenticateToken, deletePost);

// router.get('/post/:id', authenticateToken, getPost);
// router.get('/posts', authenticateToken, getAllPosts);

// router.put('/file/upload', upload.single('file'), uploadImage);
// router.get('/file/:filename', getImage);
router.get('/get-upload-url',generateUploadURL)
router.post('/create-blog', authenticateToken, createBlog);


// router.post('/comment/new', authenticateToken, newComment);
// router.get('/comments/:id', authenticateToken, getComments);
// router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;