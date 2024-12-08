import express from 'express';

import { saveSendEmails, getEmails, toggleStarredEmail, deleteEmails, 
    moveEmailsToBin } from '../controller/email-controller.js';

const routes = express.Router();

routes.post('/emails/save', saveSendEmails);
routes.post('/emails/save-draft', saveSendEmails);
routes.get('/emails/:type', getEmails);
routes.post('/emails/starred', toggleStarredEmail);
routes.delete('/emails/delete', deleteEmails);
routes.post('/emails/bin', moveEmailsToBin);

export default routes;