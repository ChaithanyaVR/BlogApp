// import multer from 'multer';
// import { GridFsStorage} from 'multer-gridfs-storage';




// const storage = new GridFsStorage({
//     url: 'mongodb+srv://chaithanyavr56:blogapp@blog-app.gtr8x2r.mongodb.net/?retryWrites=true&w=majority&appName=blog-app',
//     options: { useNewUrlParser: true ,useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpg", "image/jpeg"];

//         if (!match.includes(file.mimetype)) {
//             const filename = `${Date.now()}-blog-${file.originalname}`;
//             return {
//                 bucketName: "photos",
//                 filename
//             };
//         }
 
//         const filename = `${Date.now()}-blog-${file.originalname}`;
//         return {
//             bucketName: "photos",
//             filename
//         };
//     }
// });


// export default multer({storage}); 



import multer from 'multer';
import multerGridFs from 'multer-gridfs-storage';

const GridFsStorage = multerGridFs.default || multerGridFs;

const storage = new GridFsStorage({
    url: 'mongodb+srv://chaithanyavr56:blogapp@blog-app.gtr8x2r.mongodb.net/?retryWrites=true&w=majority&appName=blog-app',
    options: { useNewUrlParser: true, useUnifiedTopology: true }, // Added `useUnifiedTopology` for better connection handling
    file: (req, file) => {
        // List of accepted mime types for images
        const match = ['image/png', 'image/jpg', 'image/jpeg'];

        // If the file type isn't allowed, throw an error
        if (!match.includes(file.mimetype)) {
            return null; // Returning null means multer will reject the file, but you can modify it to send a custom error message
        }

        // Filename structure
        const filename = `${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: 'bloggingweb', // Specifies the bucket name in GridFS
            filename, // Specifies the filename for the stored file
        };
    },
});

export default multer({ storage });
