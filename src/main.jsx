import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/public-sans";
import "./index.css";

import App from "./App";

import QueryProvider from "./providers/QueryProvider";
import AppUIProvider from "./providers/AppUIProvider";
import AuthProvider from "./providers/AuthProvider";
import NavigationProvider from "./providers/NavigationProvider";
import AppInitializer from "./AppInitializer";
import { DialogProvider } from "./components/dialog";

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryProvider>
        
        <BrowserRouter>

            <AuthProvider>
                
                <AppUIProvider>

                    <NavigationProvider>

                        <DialogProvider>
                            
                            <AppInitializer>

                                <App />
                                
                            </AppInitializer>

                        </DialogProvider>


                    </NavigationProvider>

                </AppUIProvider>

            </AuthProvider>
            
        </BrowserRouter>

    </QueryProvider>
);