import {
  createBrowserRouter
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import PageLayout from "../Pages/PageLayout";
import Domains from "../Pages/Domains";
import Users from "../Pages/Users";
import ProfilePage from "../Pages/ProfilePage";
import DomainCreate from "../Pages/DomainCreate";

const router = createBrowserRouter([{
    path: '/',
    element: <PageLayout/>,
    errorElement: <ErrorPage />,
    children: [{
        path: '',
        element: <ProfilePage />
    }, {
        path: 'domains/',
        children: [{
            path: '',
            element: <Domains/>
        }, {
            path: 'create/',
            element: <DomainCreate />
        }]
    }, {
        path: 'users/',
        element: <Users />
    }]
}]);

export default router