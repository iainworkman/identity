import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import {RouterProvider} from "react-router-dom";
import Routes from "./Navigation/Routes";
import {ChakraProvider} from "@chakra-ui/react";
import AuthProvider from "./Auth/AuthProvider";
import DefaultTheme from "./Themes/DefaultTheme";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <ChakraProvider theme={DefaultTheme}>
            <AuthProvider>
                <RouterProvider router={Routes} />
            </AuthProvider>
        </ChakraProvider>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
