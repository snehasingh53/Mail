// services/EmailService.js
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';
import FetchedEmail from './model/FetchedEmail.js';


dotenv.config();

class EmailService {
    constructor() {
        this.client = null;
    }

    async fetchEmails() {
        // Create a new ImapFlow client
        const client = new ImapFlow({
            host: process.env.IMAP_HOST,
            port: Number(process.env.IMAP_PORT),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const fetchedEmails = [];
        const maxEmails = 5;  // Set a maximum number of emails to fetch

        try {
            // Connect to the IMAP server
            await client.connect();
            console.log('Connected to IMAP server');

            // Lock the mailbox to prevent concurrent access
            const lock = await client.getMailboxLock('INBOX');

            try {
                // Fetch messages
                for await (let message of client.fetch('1:*', { 
                    envelope: true, 
                    source: true 
                })) {
                    try {
                        // Parse the email
                        const parsed = await simpleParser(message.source);

                        // Create email object with necessary fields
                        const emailDetails = {
                            to: parsed.to.text, 
                            from: parsed.from.text,
                            subject: parsed.subject,
                            body: parsed.text,  // Use parsed.text for the plain-text body
                            date: new Date(parsed.date),
                            isRead: false,  // Default to unread
                            starred: false,  // Default to not starred
                            type: 'inbox',  // You can change it if the email is from another folder
                        };

                        // Save the email to the database
                        const newFetchedEmail = new FetchedEmail(emailDetails);
                        await newFetchedEmail.save();

                        fetchedEmails.push(emailDetails);  // Add to the fetched emails array

                        // Log email details
                        console.log('Fetched Email:', emailDetails);

                        // Break the loop if we've reached the max number of emails
                        if (fetchedEmails.length >= maxEmails) {
                            break;
                        }
                    } catch (parseError) {
                        console.error('Error parsing email:', parseError);
                    }
                }
            } finally {
                // Release the mailbox lock
                lock.release();
            }

            return fetchedEmails;
        } catch (error) {
            console.error('Error fetching emails:', error);
            throw error;
        } finally {
            // Ensure client is logged out
            await client.logout();
        }
    }
}

// Export an instance of the EmailService
export default new EmailService();
