import {
  createBrowserRouter
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import PageLayout from "../Pages/PageLayout";
import DomainList from "../Domains/DomainList";
import UserList from "../Users/UserList";
import ProfileDetail from "../Users/ProfileDetail";
import DomainCreate from "../Domains/DomainCreate";
import UserDetail from "../Users/UserDetail";
import DomainDetail from "../Domains/DomainDetail";

const router = createBrowserRouter([{
    path: '/',
    element: <PageLayout/>,
    errorElement: <ErrorPage />,
    children: [{
        path: '',
        element: <ProfileDetail />
    }, {
        path: 'domains/',
        children: [{
            path: '',
            element: <DomainList/>
        }, {
            path: ':domainId/',
            element: <DomainDetail />
        }, {
            path: 'create/',
            element: <DomainCreate />
        }]
    }, {
        path: 'users/',
        children: [{
            path: '',
            element: <UserList />
        }, {
            path: ':username/',
            element: <UserDetail/>
        }]
    }]
}]);

export default router