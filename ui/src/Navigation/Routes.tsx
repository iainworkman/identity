import {
  createBrowserRouter
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import PageLayout from "../Pages/PageLayout";
import DomainList from "../Domains/DomainList";
import UserList from "../Users/UserList";
import ProfileDetail from "../Users/ProfileDetail";
import DomainCreate from "../Domains/DomainCreate";

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
            path: 'create/',
            element: <DomainCreate />
        }]
    }, {
        path: 'users/',
        element: <UserList />
    }]
}]);

export default router