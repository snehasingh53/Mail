// models/FetchedEmail.js
import mongoose from 'mongoose';

const FetchedEmailSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    body: { type: String },
    date: { type: Date, required: true },
    image: { type: String },
    starred: { type: Boolean, default: false },
    bin: { type: Boolean, default: false },
    type: { type: String, required: true, enum: ['inbox', 'sent', 'draft'] }, // Example email types
});

const FetchedEmail = mongoose.model('FetchedEmail', FetchedEmailSchema);

export default FetchedEmail;
