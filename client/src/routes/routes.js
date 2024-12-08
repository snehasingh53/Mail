import { lazy } from "react";

const Landing = lazy(() => import('../pages/Landing'));
const Emails = lazy(() => import('../components/Emails'));
const ViewEmail = lazy(() => import('../components/ViewEmail')); // Corrected import

const routes = {
    main: {
        path: '/landing',
        element: Landing
    },
    invalid: {
        path: '/landing/*',
        element: Emails
    },
    emails: {
        path: '/landing/emails',
        element: Emails
    },
    view: {
        path: '/landing/view',
        element: ViewEmail
    }
};

export { routes };