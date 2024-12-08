export const API_URLS = {
    saveSentEmails: {
        endpoint: 'emails/save',
        method: 'POST'
    },
    saveDraftEmails: {
        endpoint: 'emails/save-draft',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'emails',
        method: 'GET'
    },
    toggleStarredMails: {
        endpoint: 'emails/starred',
        method: 'POST'
    },
    deleteEmails: {
        endpoint: 'emails/delete',
        method: 'DELETE'
    },
    moveEmailsToBin: {
        endpoint: 'emails/bin',
        method: 'POST'
    }
}