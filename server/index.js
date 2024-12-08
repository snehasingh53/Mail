import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import UserModel from './model/User.js';  // Correct path for your model
import Connection from './Database/db.js';
import nodemailer from 'nodemailer';  // Import nodemailer
import emailService from './emailService.js';
import routes from "./routes/route.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    credentials: true
}));

// MongoDB Username and Password (environment variables)
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Set up session with MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kxao4nf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/MailServer`
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

app.use(express.urlencoded({ extended: true }));

// MongoDB Connection Setup
Connection();

// Set up Nodemailer transporter using your credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can change this if using another service like 'hotmail' or 'yahoo'
    auth: {
        user: process.env.EMAIL_USER,  // Your email address
        pass: process.env.EMAIL_PASS,  // Your email password or app password
    },
});


// Sign-up route with email sending after successful registration
app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        // Send a welcome email after successful sign-up
        await sendEmail(
            email,
            'Welcome to our service!',
            'Thank you for signing up with our service!',
            '<h1>Welcome to our service!</h1><p>Thank you for signing up with us.</p>'
        );

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
app.post("/login", async (req, res) => {
    console.log("Login request received:", req.body); // Log the request body
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            console.log("User found:", user); // Log user details
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, name: user.name, email: user.email };
                console.log("Login successful:", req.session.user); // Log session user
                res.json("Success");
            } else {
                console.log("Password does not match");
                res.status(401).json("Password doesn't match");
            }
        } else {
            console.log("No user found with that email");
            res.status(404).json("No Records found");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: error.message });
    }
});

// Logout route
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

// Get user route
app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});

app.get('/fetch-emails', async (req, res) => {
    try {
        console.log('Manual email fetch initiated');
        const emails = await emailService.fetchEmails();
        res.json({
            status: 'success',
            message: 'Emails fetched successfully',
            emails: emails || []
        });
    } catch (error) {
        console.error('Email fetch error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch emails',
            error: error.message
        });
    }
});

app.use("/landing", routes)



// Start the server
const PORT = process.env.PORT ;  // Default to port 5000 if not defined
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});