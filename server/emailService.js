import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import dotenv from 'dotenv';

dotenv.config();

class emailService {
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
                pass: process.env.EMAIL_PASS
            }
        });

        const fetchedEmails = [];

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
                        
                        // Create email object with only the required fields
                        const emailDetails = {
                            id: message.seq,
                            subject: parsed.subject,
                            from: parsed.from.text
                        };

                        fetchedEmails.push(emailDetails);

                        // Log email details
                        console.log('Fetched Email:', {
                            subject: emailDetails.subject,
                            from: emailDetails.from
                        });
                    } catch (parseError) {
                        console.error('Error parsing email:', parseError);
                    }
                }
            } finally {
                // Release the mailbox lock
                lock.release();
            }

            return fetchedEmails; // Return the fetched emails in the desired format
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
export default new emailService();