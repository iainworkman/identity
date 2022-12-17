import {
  createBrowserRouter
} from "react-router-dom";
import ErrorPage from "../Pages/ErrorPage";
import PageLayout from "../Pages/PageLayout";
import Domains from "../Pages/Domains";
import Users from "../Pages/Users";

const router = createBrowserRouter([{
    path: '/',
    element: <PageLayout/>,
    errorElement: <ErrorPage />,
    children: [{
        path: '/domains',
        element: <Domains/>
    }, {
        path: '/users',
        element: <Users />
    }]
}]);

export default router