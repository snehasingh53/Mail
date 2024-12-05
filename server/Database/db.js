import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 

const Connection = () => {
    const DB_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kxao4nf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        mongoose.connect(DB_URI);
        mongoose.set('strictQuery', false);
        console.log('Database connected sucessfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message)
    }
}

export default Connection;