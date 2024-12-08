import { routes } from "../routes/routes";
import MailOutlined from '@mui/icons-material/MailOutlined';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorder from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

export const SIDEBAR_DATA = [ // Named export
    {
        name: 'inbox',
        title: 'Inbox',
        icon: InboxIcon,
        path: routes.emails.path
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarBorder,
        path: routes.emails.path
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: SendIcon,
        path: routes.emails.path
    },
    {
        name: 'drafts',
        title: 'Drafts',
        icon: DraftsIcon,
        path: routes.emails.path
    },
    {
        name: 'bin',
        title: 'Bin',
        icon: DeleteIcon,
        path: routes.emails.path
    },
    {
        name: 'allmail',
        title: 'All Mail',
        icon: MailOutlined,
        path: routes.emails.path
    }
];