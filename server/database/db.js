import mongoose from "mongoose";

const Connection = async (username,password) => {
const URL = `mongodb+srv://${username}:${password}@blog-app.gtr8x2r.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
try {
    await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true },)
    console.log('Database connected successfully');
} catch (error) {
    console.log('Error while connecting to the database ', error);
}
};


export default Connection;