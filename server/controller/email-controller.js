import Email from "../model/email.js";
import FetchedEmail from "../model/FetchedEmail.js";
import emailService from "../emailService.js"

export const fetchAndSaveEmails = async (request, response) => {
    try {
        const fetchedEmails = await emailService.fetchEmails();
        response.status(200).json({
            status: 'success',
            message: 'Emails fetched and saved successfully',
            emails: fetchedEmails,
        });
    } catch (error) {
        console.error('Error fetching and saving emails:', error);
        response.status(500).json({ error: error.message });
    }
};

export const saveSendEmails = async (request, response) => {
    try {
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'inbox') {
            // Fetch emails from the FetchedEmail collection for inbox
            emails = await FetchedEmail.find({ type: 'inbox' }).sort({ date: -1 });
            console.log('Fetched Emails from FetchedEmail collection:', emails);
        } else if (request.params.type === 'starred') {
            // Fetch starred emails from both collections
            const [starredEmailsFromFetched, starredEmailsFromEmail] = await Promise.all([
                FetchedEmail.find({ starred: true }),
                Email.find({ starred: true, bin: false })
            ]);
            emails = [...starredEmailsFromFetched, ...starredEmailsFromEmail];
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true });
        } else if (request.params.type === 'allmail') {
            // Fetch emails from both collections
            const [fetchedEmails, emailRecords] = await Promise.all([
                FetchedEmail.find({}),
                Email.find({})
            ]);
            emails = [...fetchedEmails, ...emailRecords];
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        console.error('Error fetching emails:', error);
        response.status(500).json(error.message);
    }
};



export const toggleStarredEmail = async (request, response) => {
    try {   
        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}